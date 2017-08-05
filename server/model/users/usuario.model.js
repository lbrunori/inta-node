const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;


let UsuarioSchema = new Schema({
    nombre: {
        required: true,
        trim: true,
        type: String,
        minlength: 2,
        maxlength: 100
    },
    apellido: {
        required: true,
        trim: true,
        type: String,
        minlength: 2,
        maxlength: 100
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} no es un email válido.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

let Usuario = mongoose.model('Usuario', UsuarioSchema)

module.exports = { Usuario };