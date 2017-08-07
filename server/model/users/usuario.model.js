const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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
    email: {
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

UsuarioSchema.methods.toJSON = function () {
    let usuario = this;
    let usuarioObject = usuario.toObject();

    return _.pick(usuarioObject, ['_id', 'email'])
}

UsuarioSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
};

UsuarioSchema.statics.findByToken = function (token) {
    let Usuario = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (error) {
        console.error(error);
        return Promise.reject();
    }

    return Usuario.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });

}


let Usuario = mongoose.model('Usuario', UsuarioSchema)

module.exports = { Usuario };