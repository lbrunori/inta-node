const mongoose = require('mongoose');

let RolModel = mongoose.model('Rol', {
    nombre: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 50,
        lowercase: true
    }
})

module.exports = { RolModel };