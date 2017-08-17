const Rol = require('./../../model/users/rol.model').RolModel;

let getRoles = (req, res) => {
    Rol.find().then((roles) => {
        return res.send(roles);
    }).catch((err) => {
        console.error(err);
        return res.status(404).json({error_code: 7, err_desc: 'Error al recuperar los roles.'});
    })
}

module.exports = {
    getRoles
}