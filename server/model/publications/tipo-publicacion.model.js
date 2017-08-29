const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TipoPublicacion = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    nombreDescriptivo: {
        type: String,
        required: true,
        trim: true
    }
})

TipoPublicacion.statics.findByNombre = function (nombre) {

    let TipoPublicacion = this;

    return TipoPublicacion.findOne({ nombre })
        .then((tipoPublicacion) => {
            if (!tipoPublicacion) {
                return Promise.reject();
            }

            return new Promise((resolve, reject) => {
                resolve(tipoPublicacion);
            })
        })
}

let TipoPublicacionModel = mongoose.model('TipoPublicacion', TipoPublicacion)

module.exports = {
    TipoPublicacionModel
}