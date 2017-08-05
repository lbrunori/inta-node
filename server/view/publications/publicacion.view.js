const express = require("express");
let PublicacionView = express.Router();

const PublicacionController = require('./../../controller/publications/publicacion.controller')

PublicacionView.
    route('/publicaciones').
    post(PublicacionController.savePublicacion);

PublicacionView.
    route('/publicaciones/:id').
    get(PublicacionController.findById);

module.exports = {
    PublicacionView
}