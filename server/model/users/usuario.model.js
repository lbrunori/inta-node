const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
    var token = jwt.sign(
        {
            _id: user._id.toHexString(),
            access
        }, 'abc123', { expiresIn: 60 * 60 * 24 }).toString();

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
        return Promise.reject();
    }

    return Usuario.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });

}

UsuarioSchema.statics.findByCredentials = function (email, password) {

    let Usuario = this;

    return Usuario.findOne({ email })
        .then((usuario) => {
            if (!usuario) {
                return Promise.reject();
            }

            return new Promise((resolve, reject) => {
                bcrypt.compare(password, usuario.password, (err, res) => {
                    if (res) {
                        resolve(usuario);
                    } else {
                        reject();
                    }
                })
            })
        })
}



UsuarioSchema.pre('save', function (next) {
    let usuario = this;

    if (usuario.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(usuario.password, salt, (err, hash) => {
                usuario.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});


let Usuario = mongoose.model('Usuario', UsuarioSchema)

module.exports = { Usuario };