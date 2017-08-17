const _ = require('lodash');

const Usuario = require('./../model/users/usuario.model').UsuarioModel;

let authenticate = (req, res, next) => {

    let token = req.header('x-auth');

    Usuario.findByToken(token)
        .populate('rol')
        .exec((err, usuario) => {
            if(err){
                console.error(err);
                return Promise.reject();
            }
        
            if (!usuario) {
                console.error(err);
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