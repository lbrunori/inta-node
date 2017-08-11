const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const cors = require('cors');


const { PublicacionRouter } = require('./routes/publications/publicacion.route')
const { UsuarioRouter } = require('./routes/users/usuario.route');
const { RolRouter } = require('./routes/users/rol.route');
const { TipoPublicacionRouter } = require('./routes/publications/tipo-publicacion.route');


let app = express();

app.use(bodyParser.json());
app.use(cors());

app
    .use('/api', PublicacionRouter)
    .use('/api', UsuarioRouter)
    .use('/api', RolRouter)
    .use('/api', TipoPublicacionRouter);

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
}