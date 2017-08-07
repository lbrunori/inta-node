const express = require('express');

let UsuarioView = express.Router();
let { authenticate } = require('./../../middleware/authenticate');

const UsuarioController = require('./../../controller/users/usuario.controller');

UsuarioView
    .route('/usuarios')
    .post(UsuarioController.saveUsuario);
UsuarioView
    .route('/usuarios/me')
    .get(authenticate, UsuarioController.userMe);


module.exports = {
    UsuarioView
}