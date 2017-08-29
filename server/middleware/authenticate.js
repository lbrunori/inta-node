const _ = require('lodash');

const Usuario = require('./../model/users/usuario.model').UsuarioModel;

let authenticate = (req, res, next) => {

    let token = req.header('x-auth');

    if (!token) { return res.status(401).send() }
    Usuario.findByToken(token)
        .populate('rol')
        .exec((err, usuario) => {
            if (err) {
                console.error(err);
                return res.status(401).send();
            }

            if (!usuario) {
                console.error("No hay usuario");
                return res.status(401).send();
            }

            req.usuario = usuario;
            req.token = token;
            next();
        })
        .catch((e) => {
            res.status(401).send();
        })
}

let hasRolAdmin = (req, res, next) => {
    Usuario.findOne(req.usuario._id).populate('rol').exec((err, usuario) => {
        if (err) {
            res.status(401).send()
        };

        if (!_.isNull(usuario.rol)) {
            if (usuario.rol.nombre === 'admin') {
                next();
            } else {
                res.status(401).send()
            }
        } else {
            res.status(401).send()
        }
    });

}

module.exports = {
    authenticate,
    hasRolAdmin
}