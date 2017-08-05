const mongoose = require('mongoose');

let Publicacion = mongoose.model('Publicacion', {
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        trim: true
    }
})

module.exports = { Publicacion }