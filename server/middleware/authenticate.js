const _ = require('lodash');

const { Usuario } = require('./../model/users/usuario.model');

let authenticate = (req, res, next) => {

    let token = req.header('x-auth');

    Usuario.findByToken(token)
        .then((usuario) => {
            if (!usuario) {
                return Promise.reject();
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
    console.log(req.usuario);
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