const mongoose = require('mongoose');

let Rol = mongoose.model('Rol', {
    nombre: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 50
    },
    nombreDescriptivo: {
        type: String,
        minlength: 2,
        maxlength: 50
    },
    descripcion: {
        type: String,
        minlength: 5,
        maxlength: 250
    }
})

module.exports = { Rol };