const _ = require('lodash');

const TipoPublicacion = require('./../../model/publications/tipo-publicacion.model').TipoPublicacionModel;

let getTiposPublicacion = (req, res) => {
    TipoPublicacion.find().then((tiposPublicacion) => {
        return res.send(tiposPublicacion);
    }).catch((err) => {
        return res.status(404).send();
    })
}

let saveTiposPublicacion = (req, res) => {
    let body = _.pick(req.body, ['nombre'])
    let tipoPublicacion = new TipoPublicacion(body);

    tipoPublicacion.save(body)
        .then((tp) => {
            res.send(tp);
        })
        .catch((e) => {
            res.statud(400).send();
        })
}

module.exports = {
    getTiposPublicacion,
    saveTiposPublicacion
}