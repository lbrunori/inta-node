const express = require("express");

const PublicacionRouter = express.Router();
const { authenticate } = require('./../../middleware/authenticate');

const publicacionController = require('./../../controller/publications/publicacion.controller')

PublicacionRouter
    .route('/publicaciones')
    .post(authenticate, publicacionController.savePublicacion)
    .get(publicacionController.getPublicaciones)
    .put(authenticate,publicacionController.updatePublicacion);
PublicacionRouter
    .route('/publicaciones/:id')
    .get(publicacionController.getPublicacion)
    .delete(authenticate, publicacionController.deletePublicacion)
module.exports = {
    PublicacionRouter
}