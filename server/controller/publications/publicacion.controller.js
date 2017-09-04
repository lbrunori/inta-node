const { ObjectID } = require('mongodb');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
const { upload } = require('./../../middleware/uploader');

const Publicacion = require(
    './../../model/publications/publicacion.model').PublicacionModel;
const TipoPublicacion = require(
    './../../model/publications/tipo-publicacion.model').TipoPublicacionModel;

let savePublicacion = (req, res) => {
    let pathImagen = "";
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(404).json(
                {
                    error_code: 1,
                    err_desc: 'Error al almacenar imagen en disco.'
                });
        };

        let body = _.pick(req.body,
            ['titulo', 'descripcion', 'contenido', 'fuente']);
        body.creador = req.usuario;
        body.tipoPublicacion = JSON.parse(req.body.tipoPublicacion);

        pathImage = path.join(__dirname, '..', '..', 'images-uploaded') + '/' + req.file.filename;
        try {

            jimp.read(pathImage, function (err, image) {
                if (err) throw err;
                image
                    .resize(480, 324)            // resize
                    .quality(40);
                image.getBase64(jimp.MIME_PNG, (err, img) => {
                    body.imagenPortada = img;
                    let publicacion = new Publicacion(body);
                    fs.unlink(pathImage);
                    publicacion.save().then((publicacion) => {
                        res.send(publicacion);
                    }, (err) => {
                        console.error(err);
                        res.status(400).json(
                            { error_code: 2, err_desc: 'Erro al almacenar imagen en db' });
                    })
                })
            });
        }
        catch (e) {
            console.error(e);
            res.status(400).json(
                { error_code: 4, err_desc: 'Error al recuperar la imagen' });
        }
    });
}

let getPublicacion = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).json(
            { error_code: 3, err_desc: 'ID no válido' });
    }

    Publicacion.findById(id)
        .populate('tipoPublicacion')
        .populate('creador')
        .lean()
        .exec((err, publicacion) => {
            if (!publicacion) {
                return res.status(404).json(
                    { error_code: 4, err_desc: 'Publicacion no encontrada' });
            }
            if (publicacion.creador._id !== req.usuario._id
                && req.usuario.rol.nombre !== 'admin') {
                return res.status(401).json({
                    error_code: 4,
                    err_desc: 'No autorizado para acceder a la publicacion'
                });
            }
            res.send({ publicacion });

        }
        ).catch((e) => {
            res.status(400).json(
                { error_code: 4, err_desc: 'Error al obtener publicación.' });
        });
}

let getPublicaciones = (req, res) => {
    let objQuery = { 'creador': req.usuario._id };
    if (req.usuario.rol.nombre === 'admin') {
        objQuery = {}
    }
    Publicacion.find(objQuery)
        .populate('tipoPublicacion')
        .populate('creador')
        .exec((err, publicaciones) => {
            if (err) {
                res.status(400).json(
                    { error_code: 4, err_desc: 'Publicacion no encontrada' });
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
        return res.status(404).json({ error_code: 3, err_desc: 'ID no válido' });
    }

    Publicacion.findByIdAndRemove(id)
        .then((resp) => {
            res.send();
        }).catch((err) => {
            res.status(400).send();
        });

}

let updatePublicacion = (req, res) => {
    let pathImagen = "";
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(404).json(
                {
                    error_code: 1,
                    err_desc: 'Error al almacenar imagen en disco.'
                });
        };

        let id = req.params.id;
        let body = _.pick(req.body, ['titulo',
            'descripcion', 'contenido', 'fuente']);
        if (typeof req.file === 'undefined') {
            body.tipoPublicacion = req.body.tipoPublicacion;
        } else {
            body.tipoPublicacion =
                body.tipoPublicacion = JSON.parse(req.body.tipoPublicacion);
        }

        if (!ObjectID.isValid(id)) {
            return res.status(404).json({ error_code: 3, err_desc: 'ID no válido' });
        }

        if (typeof req.file === 'undefined') {
            Publicacion.findByIdAndUpdate(id, { $set: body }, { new: true }).then((publicacion) => {
                res.send(publicacion);
            }, (err) => {
                console.error(err);
                res.status(400).json(
                    { error_code: 2, err_desc: 'Erro al almacenar imagen en db' });
            })
        } else {
            pathImage = path.join(__dirname, '..', '..', 'images-uploaded') + '/' + req.file.filename;
            try {
                jimp.read(pathImage, function (err, image) {
                    if (err) throw err;
                    image.resize(720, 480).quality(70)

                    image.getBase64(jimp.MIME_PNG, (err, img) => {
                        body.imagenPortada = img;
                        fs.unlink(pathImage);
                        Publicacion.findByIdAndUpdate(id, { $set: body }, { new: true }).then((publicacion) => {
                            res.send(publicacion);
                        }, (err) => {
                            console.error(err);
                            res.status(400).json(
                                { error_code: 2, err_desc: 'Erro al almacenar imagen en db' });
                        })
                    })
                });
            }
            catch (e) {
                console.error(e);
                res.status(400).json(
                    { error_code: 4, err_desc: 'Error al recuperar la imagen' });
            }
        }
    })
};


let saveUpdatePublicacion = (id, body) => {
    Publicacion.findByIdAndUpdate(id, { $set: body }, { new: true }).then(
        (publicacion) => {
            if (!publicacion) {
                return res.status(404).json(
                    { error_code: 4, err_desc: 'Publicacion no encontrada' });
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
                    { error_code: 4, err_desc: 'Publicacion no encontrada' });
            };

            res.send(publicaciones);

        });
}

let getPublicacionPublica = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).json(
            { error_code: 3, err_desc: 'ID no válido' });
    }

    Publicacion.findById(id)
        .sort({ '_id': -1 })
        .populate('tipoPublicacion')
        .lean()
        .exec((err, publicacion) => {
            if (!publicacion) {
                return res.status(404).json(
                    { error_code: 4, err_desc: 'Publicacion no encontrada' });
            }

            res.send(publicacion);
        }).catch(() => {
            res.status(400).send();
        });
}

let getPublicacionesPublicasPorTipo = (req, res) => {
    TipoPublicacion
        .findByNombre(req.params.tipo)
        .then((resp) => {
            console.log('Respuesta: ', resp)
            return Publicacion.find({
                'tipoPublicacion': resp._id
            }, ['titulo', 'descripcion', 'imagenPortada'], {
                    skip: 0, // Starting Row
                    limit: 10, // Ending Row
                    sort: {
                        fechaCreacion: -1 //Sort by Date Added DESC
                    }
                })

        })
        .then((publicaciones) => {
            if (!publicaciones) {
                res.status(404).send();
            }
            res.send(publicaciones);
        })
}

module.exports = {
    savePublicacion,
    getPublicacion,
    getPublicaciones,
    deletePublicacion,
    updatePublicacion,
    getPublicacionPublica,
    getPublicacionesPublicas,
    getPublicacionesPublicasPorTipo
}

