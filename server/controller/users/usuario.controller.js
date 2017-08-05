const { ObjectID } = require('mongodb');
const { Usuario } = require('./../../model/users/usuario.model');
const { _ } = require('lodash');

let saveUsuario = (req, res) => {

    let body = _.pick(req.body, ['nombre', 'apellido', 'username', 'password'])

    let usuario = new Usuario(body);

    usuario.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(400).send(err)
    })
}

module.exports = {
    saveUsuario
}