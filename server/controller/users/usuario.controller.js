const { ObjectID } = require('mongodb');
const { Usuario } = require('./../../model/users/usuario.model');
const { _ } = require('lodash');

let saveUsuario = (req, res) => {

    let body = _.pick(req.body, ['nombre', 'apellido', 'email', 'password']);
    let usuario = new Usuario(body);
    console.log('Usuario', usuario);


    usuario.save().then(() => {
        return usuario.generateAuthToken();
    }).then((token) => {
        console.log('Token', token)
        console.log('Usuario', usuario);
        res.header('x-auth', token).send(usuario);
    }).catch((err) => {
        res.status(400).send(err)
    })
}

let userMe = (req, res) => {
    res.send(req.usuario);
}

module.exports = {
    saveUsuario,
    userMe
}