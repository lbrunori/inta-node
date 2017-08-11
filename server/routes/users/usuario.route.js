const express = require('express');

let UsuarioRouter = express.Router();
let { authenticate, hasRolAdmin } = require('./../../middleware/authenticate');

const usuarioController = require('./../../controller/users/usuario.controller');

UsuarioRouter
    .route('/usuarios')
    .post(usuarioController.saveUsuario)
    .put(authenticate, hasRolAdmin, usuarioController.updateUsuario)
    .get(authenticate, hasRolAdmin, usuarioController.getUsuarios)
UsuarioRouter
    .route('/usuarios/me')
    .get(authenticate, usuarioController.userMe);
UsuarioRouter
    .route('/usuarios/login')
    .post(usuarioController.login);
UsuarioRouter
    .route('/usuarios/:id')
    .get(authenticate, hasRolAdmin, usuarioController.getUsuario)

module.exports = {
    UsuarioRouter
}