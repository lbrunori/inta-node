const { ObjectID } = require('mongodb');
const _ = require('lodash');

const Publicacion = require('./../../model/publications/publicacion.model').PublicacionModel;

let savePublicacion = (req, res) => {
    let body = _.pick(req.body, ['creador', 'fechaFinalizacion', 'imagenes', 'imagenPortada', 'titulo',
        'descripcion', 'contenido', 'tipoPublicacion'])
    let publicacion = new Publicacion(body);

    publicacion.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
}

let getPublicacion = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("La ID no es válida");
    }

    Publicacion.findById(id)
        .populate('tipoPublicacion')
        .populate('creador')
        .exec()
        .then((publicacion) => {
            if (!publicacion) {
                return res.status(404).send("Elemento no encontrado");
            }

            res.send({ publicacion });
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
                res.status(401).send()
            };

            res.send(publicaciones);
        })
}

let deletePublicacion = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("La ID no es válida");
    }

    Publicacion.findByIdAndRemove(id)
        .then((resp) => {
            res.send();
        }).catch((err) => {
            res.status(400).send();
        });

}

let updatePublicacion = () => {

}



module.exports = {
    savePublicacion,
    getPublicacion,
    getPublicaciones,
    deletePublicacion,
    updatePublicacion
}
