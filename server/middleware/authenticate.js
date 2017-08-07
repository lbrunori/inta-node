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

module.exports = {
    authenticate
}