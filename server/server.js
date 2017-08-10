const express = require('express');
const bodyParser = require('body-parser');

const { PublicacionRouter } = require('./routes/publications/publicacion.route')
const { UsuarioRouter } = require('./routes/users/usuario.route');
const { RolRouter } = require('./routes/users/rol.route');

let app = express();

app.use(bodyParser.json());

app
    .use('/api', PublicacionRouter)
    .use('/api', UsuarioRouter)
    .use('/api', RolRouter);

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
}
