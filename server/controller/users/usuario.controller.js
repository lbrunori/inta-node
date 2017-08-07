const { ObjectID } = require('mongodb');
const { Usuario } = require('./../../model/users/usuario.model');
const { _ } = require('lodash');
const bcrypt = require('bcryptjs');

/**
 * Crea un nuevo usuario en la base de datos.
 * 
 * @param {*} req 
 * @param {*} res 
 */
let saveUsuario = (req, res) => {

    let body = _.pick(req.body, ['nombre', 'apellido', 'email', 'password']);
    let usuario = new Usuario(body);

    usuario.save().then(() => {
        return usuario.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(usuario);
    }).catch((err) => {
        res.status(400).send(err);
    })
}

let login = (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    Usuario.findByCredentials(body.email, body.password)
        .then((usuario) => {
            return usuario.generateAuthToken().then((token) => {
                res.header('x-auth', token).send(usuario);
            });
        })
        .catch((err) => {
            res.status(400).send();
        });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
let userMe = (req, res) => {
    res.send(req.usuario);
}

module.exports = {
    saveUsuario,
    userMe,
    login
}