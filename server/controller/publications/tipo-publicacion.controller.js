const TipoPublicacion = require('./../../model/publications/tipo-publicacion.model').TipoPublicacionModel;

let getTiposPublicacion = (req, res) => {
    TipoPublicacion.find().then((tiposPublicacion) => {
        return res.send(tiposPublicacion);
    }).catch((err) => {
        return res.status(404).send();
    })
}

module.exports = {
    getTiposPublicacion
}