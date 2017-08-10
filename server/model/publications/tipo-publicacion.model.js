const mongoose = require('mongoose');

let TipoPublicacionModel = mongoose.model('TipoPublicacion', {
    contenido: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
})

module.exports = {
    TipoPublicacionModel
}