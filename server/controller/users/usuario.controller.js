const { ObjectID } = require('mongodb');
const Usuario = require('./../../model/users/usuario.model').UsuarioModel;
const { _ } = require('lodash');

/**
 * Crea un nuevo usuario en la base de datos.
 * 
 * @param {*} req 
 * @param {*} res 
 */
let saveUsuario = (req, res) => {

    let body = _.pick(req.body, ['nombre', 'apellido', 'email', 'password', 'rol']);
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
                res.header('x-auth', token).json({ token: token, _id: usuario._id });
            });
        })
        .catch((err) => {
            res.status(400).send();
        });
}

let updateUsuario = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'apellido', 'email', 'password', 'rol']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Usuario.findByIdAndUpdate(id, { $set: body }, { new: true }).then((usuario) => {
        if (!usuario) {
            return res.status(404).send();
        }
        res.send(usuario);
    })
}

let deleteUsuario = (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Usuario.findByIdAndRemove(id).then((usuario) => {
        if (!usuario) {
            return res.status(404).send();
        }

        res.send(usuario);
    })
}

let getUsuarios = (req, res) => {
    Usuario.find().then((usuarios) => {
        return res.send(usuarios);
    }).catch((e) => {
        return res.status(404).send();
    })
}

let getUsuario = (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Usuario.findById(id).then((usuario) => {
        if (!usuario) {
            return res.status(404).send();
        }

        return res.send({ usuario });
    })
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
    login,
    updateUsuario,
    deleteUsuario,
    getUsuarios,
    getUsuario
}