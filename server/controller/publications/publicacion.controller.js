const { ObjectID } = require('mongodb');
const { Publicacion } = require('./../../model/publications/publicacion.model');

let savePublicacion = (req, res) => {
    let publicacion = new Publicacion({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion
    })

    publicacion.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
}

let findById = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.statud(404).send("La ID no es válida");
    }

    Publicacion.findById(id).then((publicacion) => {
        if (!publicacion) {
            return res.status(404).send("Elemento no encontrado");
        }

        res.send({ publicacion });
    }).catch(() => {
        res.status(400).send();
    })
}

// TODO: hacer un get todos con paginacion;

let findAllInPage = (res, req) => {

}

module.exports = {
    savePublicacion,
    findById
}
