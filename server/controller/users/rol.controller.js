const Rol = require('./../../model/users/rol.model').RolModel;

let getRoles = (req, res) => {
    Rol.find().then((roles) => {
        return res.send(roles);
    }).catch((e) => {
        return res.status(404).send();
    })
}

module.exports = {
    getRoles
}