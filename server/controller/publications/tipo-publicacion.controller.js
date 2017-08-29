const _ = require('lodash');

const TipoPublicacion = require('./../../model/publications/tipo-publicacion.model').TipoPublicacionModel;

let getTiposPublicacion = (req, res) => {
    TipoPublicacion.find().then((tiposPublicacion) => {
        return res.send(tiposPublicacion);
    }).catch((err) => {
        console.error(err);
        return res.status(404).json({ error_code: 6, err_desc: 'No se pudó recuperar los tipos de publicaciones' });
    })
}

let saveTiposPublicacion = (req, res) => {
    let body = _.pick(req.body, ['nombre'])
    let tipoPublicacion = new TipoPublicacion(body);

    tipoPublicacion.save(body)
        .then((tp) => {
            res.send(tp);
        })
        .catch((err) => {
            console.error(err);
            res.statud(400).json({ error_code: 5, err_desc: 'No se puedo almacenar el tipo de publicación' });
        })
}

module.exports = {
    getTiposPublicacion,
    saveTiposPublicacion
}