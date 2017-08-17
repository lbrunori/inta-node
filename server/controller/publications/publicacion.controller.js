const {ObjectID} = require('mongodb');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const {upload} = require('./../../middleware/uploader');

const Publicacion = require(
    './../../model/publications/publicacion.model').PublicacionModel;

let savePublicacion = (req, res) => {
    console.log(req);
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            res.status(404).json(
                {
                    error_code: 1,
                    err_desc: 'Error al almacenar imagen en disco.'
                });
        }
        ;

        let body = _.pick(req.body,
            ['titulo', 'descripcion', 'contenido', 'fuente']);
        body.creador = req.usuario;
        body.tipoPublicacion = JSON.parse(req.body.tipoPublicacion);
        body.imagenPortada = req.file.filename;

        let publicacion = new Publicacion(body);

        publicacion.save().then((publicacion) => {
            res.send(publicacion);
        }, (err) => {
            console.error(err);
            res.status(400).json(
                {error_code: 2, err_desc: 'Erro al almacenar imagen en db'});
        })

    });
}

let getPublicacion = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).json(
            {error_code: 3, err_desc: 'ID no válido'});
    }

    Publicacion.findById(id)
    .populate('tipoPublicacion')
    .populate('creador')
    .lean()
    .exec((err, publicacion) => {
            if (!publicacion) {
                return res.status(404).json(
                    {error_code: 4, err_desc: 'Publicacion no encontrada'});
            }
            if (publicacion.creador._id !== req.usuario._id
                && req.usuario.rol.nombre !== 'admin') {
                return res.status(401).json({
                    error_code: 4,
                    err_desc: 'No autorizado para acceder a la publicacion'
                });
            }

            let pathImage = path.join(__dirname, '..', '..', 'images-uploaded')
            try {
                fs.readFile(`${pathImage}/${publicacion.imagenPortada}`,
                    (err, imagen) => {
                        if (!imagen) {
                            throw new Error('Imagen no encontrada en directorio')
                        }
                        ;

                        sharp(imagen)
                        .toBuffer()
                        .then(data => {
                            //contenido = data.toString('base64')
                            //imagen = 'data:image/jpeg;base64,' + contenido;
                            let imagenPortadaBase64 = `data:image/${publicacion.imagenPortada.split(
                                '.').pop()};base64,`
                                + new Buffer(data).toString('base64');
                            publicacion.imagenPortadaBase64 = imagenPortadaBase64;
                            delete publicacion.imagenPortada;
                            res.send({publicacion});
                        })
                    })
            }
            catch
                (e) {
                console.error(e);
                res.status(400).json(
                    {error_code: 4, err_desc: 'Error al recuperar la imagen'});
            }
        }
    ).catch((e) => {
        res.status(400).json(
            {error_code: 4, err_desc: 'Error al obtener publicación.'});
    });
}

let getPublicaciones = (req, res) => {
    let objQuery = {'creador': req.usuario._id};
    if (req.usuario.rol.nombre === 'admin') {
        objQuery = {}
    }
    Publicacion.find(objQuery)
    .populate('tipoPublicacion')
    .populate('creador')
    .exec((err, publicaciones) => {
        if (err) {
            res.status(400).json(
                {error_code: 4, err_desc: 'Publicacion no encontrada'});
        }
        ;

        let respuesta = publicaciones.map((elem) => {
            return _.pick(elem, 'titulo', 'fechaCreacion', 'tipoPublicacion',
                'creador', '_id');
        })

        res.send(respuesta);
    })
}

let deletePublicacion = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).json({error_code: 3, err_desc: 'ID no válido'});
    }

    Publicacion.findByIdAndRemove(id)
    .then((resp) => {
        res.send();
    }).catch((err) => {
        res.status(400).send();
    });

}

let updatePublicacion = (req, res) => {
    let id = req.body._id;
    let body = _.pick(req.body, ['titulo',
        'descripcion', 'contenido', 'tipoPublicacion']);
    body.creador = req.usuario;

    if (!ObjectID.isValid(id)) {
        return res.status(404).json({error_code: 3, err_desc: 'ID no válido'});
    }

}

let saveUpdatePublicacion = (id, body) => {
    Publicacion.findByIdAndUpdate(id, {$set: body}, {new: true}).then(
        (publicacion) => {
            if (!publicacion) {
                return res.status(404).json(
                    {error_code: 4, err_desc: 'Publicacion no encontrada'});
            }
            res.send(publicacion);
        });
}

let getPublicacionesPublicas = (req, res) => {
    Publicacion.find()
    .populate('tipoPublicacion')
    .lean()
    .exec((err, publicaciones) => {
        if (err) {
            res.status(400).json(
                {error_code: 4, err_desc: 'Publicacion no encontrada'});
        }
        ;

        var promesasFS = publicaciones.map((publicacion) => {
            return new Promise((resolve, reject) => {
                let pathImage = path.join(__dirname, '..', '..',
                    'images-uploaded')
                fs.readFile(`${pathImage}/${publicacion.imagenPortada}`,
                    (err, imagen) => {
                        if (!imagen) {
                            throw new Error(
                                'Imagen no encontrada en directorio')
                        }
                        ;

                        let imagenPortadaBase64 = `data:image/${publicacion.imagenPortada.split(
                            '.').pop()};base64,`
                            + new Buffer(imagen).toString('base64');
                        publicacion.imagenPortadaBase64 = imagenPortadaBase64;
                        delete publicacion.imagenPortada;
                        resolve(publicacion);
                    })
            })
        })

        Promise.all(promesasFS).then((resultado) => {
            res.send(resultado);
        })
    });
}

let getPublicacionPublica = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).json(
            {error_code: 3, err_desc: 'ID no válido'});
    }

    Publicacion.findById(id)
    .populate('tipoPublicacion')
    .lean()
    .exec((err, publicacion) => {
        if (!publicacion) {
            return res.status(404).json(
                {error_code: 4, err_desc: 'Publicacion no encontrada'});
        }

        let pathImage = path.join(__dirname, '..', '..', 'images-uploaded')
        try {
            fs.readFile(`${pathImage}/${publicacion.imagenPortada}`,
                (err, imagen) => {
                    if (!imagen) {
                        throw new Error(
                            'Imagen no encontrada en directorio')
                    }
                    ;

                    sharp(imagen)
                    .toBuffer()
                    .then(data => {
                        //contenido = data.toString('base64')
                        //imagen = 'data:image/jpeg;base64,' + contenido;
                        let imagenPortadaBase64 = `data:image/${publicacion.imagenPortada.split(
                            '.').pop()};base64,`
                            + new Buffer(data).toString('base64');
                        publicacion.imagenPortadaBase64 = imagenPortadaBase64;
                        delete publicacion.imagenPortada;
                        res.send({publicacion});
                    })
                })
        } catch (e) {
            console.error(e);
            res.status(400).json(
                {error_code: 4, err_desc: 'Error al recuperar la imagen'});
        }
    }).catch(() => {
        res.status(400).send();
    });
}

module.exports = {
    savePublicacion,
    getPublicacion,
    getPublicaciones,
    deletePublicacion,
    updatePublicacion,
    getPublicacionPublica,
    getPublicacionesPublicas
}

    