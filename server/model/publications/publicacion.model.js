const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const { Usuario } = require('../users/usuario')
// const { Imagen } = require('./imagen')
// const { TipoPublicacion } = require('./tipo-publicacion');

let PublicacionSchema = new Schema({
    // creador: {
    //     type: Usuario,
    //     required: true
    // },
    // fechaCreacion: {
    //     type: Date,
    //     default: Date.now
    // },
    // fechaFinalizacion: {
    //     type: Date,
    // },
    // imagenes: {
    //     type: [Imagen],
    //     required: false
    // },
    // imagenPortado: {
    //     type: Imagen,
    //     required: true
    // },
    titulo: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 250
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 255
    }
    // contenido: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 10
    // },
    // tipoPublicacion: {
    //     required: true,
    //     type: TipoPublicacion
    // }
})

let Publicacion = mongoose.model('Publicacion', PublicacionSchema);

module.exports = { Publicacion } 