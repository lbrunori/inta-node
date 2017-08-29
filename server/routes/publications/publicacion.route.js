const express = require("express");

const PublicacionRouter = express.Router();
const { authenticate } = require('./../../middleware/authenticate');

const publicacionController = require(
    './../../controller/publications/publicacion.controller')
PublicacionRouter
    .route('/publicaciones/publicas')
    .get(publicacionController.getPublicacionesPublicas);
PublicacionRouter
    .route('/publicaciones/publicas/:id')
    .get(publicacionController.getPublicacionPublica);

PublicacionRouter
    .route('/publicaciones/:tipo/publicas')
    .get(publicacionController.getPublicacionesPublicasPorTipo);
PublicacionRouter
    .route('/publicaciones')
    .post(authenticate, publicacionController.savePublicacion)
    .get(authenticate, publicacionController.getPublicaciones);
PublicacionRouter
    .route('/publicaciones/:id')
    .get(authenticate, publicacionController.getPublicacion)
    .delete(authenticate, publicacionController.deletePublicacion)
    .put(authenticate, publicacionController.updatePublicacion);

module.exports = {
    PublicacionRouter
}