const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { PublicacionView } = require('./view/publications/publicacion.view')
const { UsuarioView } = require('./view/users/usuario.view');

let app = express();

app.use(bodyParser.json());

app.use('/api', PublicacionView)
    .use('/api', UsuarioView);

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
}
