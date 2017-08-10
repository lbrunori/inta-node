const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let PublicacionSchema = new Schema({
    creador: {
        type: Schema.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaFinalizacion: {
        type: Date,
    },
    imagenes: {
        type: String,
        required: false
    },
    imagenPortada: {
        type: String,
        required: true
    },
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
    },
    contenido: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    tipoPublicacion: {
        type: Schema.ObjectId,
        ref: 'TipoPublicacion',
        required: true
    }
})

let PublicacionModel = mongoose.model('Publicacion', PublicacionSchema);

module.exports = { PublicacionModel } 