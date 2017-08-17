const {ObjectID} = require('mongodb');
const Usuario = require('./../../model/users/usuario.model').UsuarioModel;
const {_} = require('lodash');

/**
 * Crea un nuevo usuario en la base de datos.
 *
 * @param {*} req
 * @param {*} res
 */
let saveUsuario = (req, res) => {

    let body = _.pick(req.body,
        ['nombre', 'apellido', 'email', 'password', 'rol']);
    let usuario = new Usuario(body);

    usuario.save().then(() => {
        return usuario.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(usuario);
    }).catch((err) => {
        console.error(err);
        res.status(400).json(
            {error_code: 8, err_desc: 'Error al registrar el usuario'});
    })
}

let login = (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    Usuario.findByCredentials(body.email, body.password)
    .then((usuario) => {
        return usuario.generateAuthToken().then((token) => {
            res.header('x-auth', token).json({token: token, _id: usuario._id});
        });
    })
    .catch((err) => {
        console.error(err);
        res.status(400).json({
            error_code: 9,
            err_desc: 'El usuario y/o contraseña no son válidos.'
        });
    });
}

let updateUsuario = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body,
        ['nombre', 'apellido', 'email', 'password', 'rol']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).json({
            error_code: 9,
            err_desc: 'ID del usuario inválida'
        });
    }

    Usuario.findByIdAndUpdate(id, {$set: body}, {new: true}).then((usuario) => {
        if (!usuario) {
            return res.status(404).json({
                error_code: 9,
                err_desc: 'No se encontró el usuario correspondiente.'
            });
        }
        res.send(usuario);
    })
}

let deleteUsuario = (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).json({
            error_code: 9,
            err_desc: 'No se encontró el usuario correspondiente.'
        });
    }

    Usuario.findByIdAndRemove(id).then((usuario) => {
        if (!usuario) {
            return res.status(404).send();
        }
        res.send(usuario);
    }).catch(err =>{
        console.error(err);
        return res.status(404).json({
            error_code: 10,
            err_desc: 'Error al eliminar usuario.'
        })
    })
}

let getUsuarios = (req, res) => {
    Usuario.find().then((usuarios) => {
        return res.send(usuarios);
    }).catch((err) => {
        console.error(err);
        return res.status(404).json({
            error_code: 11,
            err_desc: 'No se pudieron recuperar los usuarios.'
        });
    })
}

let getUsuario = (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Usuario.findById(id).then((usuario) => {
        if (!usuario) {
            return res.status(404).json({
                error_code: 12,
                err_desc: 'Usuario no encontrado.'
            });
        }

        return res.send({usuario});
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