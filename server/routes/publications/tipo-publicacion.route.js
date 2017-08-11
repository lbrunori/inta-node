const express = require('express');

const TipoPublicacionRouter = express.Router();
const {
    authenticate
} = require('./../../middleware/authenticate');

const
    TipoPublicacionController = require('./../../controller/publications/tipo-publicacion.controller');

TipoPublicacionRouter
    .route('/tipos-publicacion')
    .get(authenticate, TipoPublicacionController.getTiposPublicacion)

module.exports = {
    TipoPublicacionRouter
}