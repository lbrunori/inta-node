const {ObjectID} = require('mongodb');
const _ = require('lodash');
const fs = require('fs');
var path = require('path');
const {upload} = require('./../../middleware/uploader');

const Publicacion = require(
    './../../model/publications/publicacion.model').PublicacionModel;

let savePublicacion = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            res.status(404).json(
                {error_code: 1, err_desc: 'Error al almacenar imagen en disco.'});
        };

        let body = _.pick(req.body, ['titulo', 'descripcion', 'contenido']);
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
    .exec()
    .then((publicacion) => {
        console.log(publicacion)
        if (!publicacion) {
            return res.status(404).json(
                {error_code: 4, err_desc: 'Publicacion no encontrada'});
        }
        let pathImage = path.join(__dirname, '..', '..', 'images-uploaded')
        try {
            fs.readFile(`${pathImage}/${publicacion.imagenPortada}`,
                (err, imagen) => {
                    if(!imagen){ throw new Error('Imagen no encontrada en directorio')};
                    
                    let imagenPortadaBase64 = 'data:image/png;base64,'
                        + new Buffer(imagen).toString('base64');
                    publicacion.imagenPortadaBase64 = imagenPortadaBase64;
                    res.send({publicacion});
                })
        } catch (e) {
            console.error(e);
            res.status(400).json({error_code: 4, err_desc: 'Error al recuperar la imagen'})
        }
    }).catch(() => {
        res.status(400).send();
    });
}

let getPublicaciones = (req, res) => {
    Publicacion.find()
    .populate('tipoPublicacion')
    .populate('creador')
    .exec((err, publicaciones) => {
        if (err) {
            res.status(400).json({error_code: 4, err_desc: 'Publicacion no encontrada'});
        };
        res.send(publicaciones);
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

    Publicacion.findByIdAndUpdate(id, {$set: body}, {new: true}).then(
        (publicacion) => {
            if (!publicacion) {
                return res.status(404).send();
            }
            res.send(publicacion);
        })
}

module.exports = {
    savePublicacion,
    getPublicacion,
    getPublicaciones,
    deletePublicacion,
    updatePublicacion
}

    