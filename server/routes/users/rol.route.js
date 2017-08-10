const express = require('express');

let RolRouter = express.Router();
let { authenticate, hasRolAdmin } = require('./../../middleware/authenticate');

const rolController = require('./../../controller/users/rol.controller');

RolRouter
    .route('/roles')
    .get(authenticate, hasRolAdmin, rolController.getRoles)

module.exports = {
    RolRouter
}