const express = require("express");
let PublicacionView = express.Router();

const PublicacionController = require('./../../controller/publications/publicacion.controller')

PublicacionView.
    route('/publicaciones').
    post(PublicacionController.savePublicacion).
    get(PublicacionController.findById);

module.exports = {
    PublicacionView
}