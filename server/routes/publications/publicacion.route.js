const express = require("express");

const PublicacionRouter = express.Router();
const { authenticate } = require('./../../middleware/authenticate');

const publicacionController = require('./../../controller/publications/publicacion.controller')

PublicacionRouter
    .route('/publicaciones')
    .post(authenticate, publicacionController.savePublicacion)
    .get(authenticate, publicacionController.getPublicaciones)
PublicacionRouter
    .route('/publicaciones/:id')
    .get(publicacionController.getPublicacion)
    .delete(publicacionController.deletePublicacion);

module.exports = {
    PublicacionRouter
}