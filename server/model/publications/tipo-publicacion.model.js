const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TipoPublicacion = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
})

let TipoPublicacionModel = mongoose.model('TipoPublicacion', TipoPublicacion)

module.exports = {
    TipoPublicacionModel
}