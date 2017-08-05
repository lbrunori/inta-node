const express = require('express');

let UsuarioView = express.Router();

const UsuarioController = require('./../../controller/users/usuario.controller');

UsuarioView
    .route('/usuarios')
    .post(UsuarioController.saveUsuario);

module.exports = {
    UsuarioView
}