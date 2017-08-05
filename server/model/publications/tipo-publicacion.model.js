const mongoose = require('mongoose');

let Imagen = mongoose.model('Imagen', {
    contenido: {
        type: String,
        required: true
    }
})