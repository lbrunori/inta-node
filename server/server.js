const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const cors = require('cors');
const multer = require('multer');

const { PublicacionRouter } = require('./routes/publications/publicacion.route')
const { UsuarioRouter } = require('./routes/users/usuario.route');
const { RolRouter } = require('./routes/users/rol.route');
const { TipoPublicacionRouter } = require('./routes/publications/tipo-publicacion.route');


let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app
    .use('/api', PublicacionRouter)
    .use('/api', UsuarioRouter)
    .use('/api', RolRouter)
    .use('/api', TipoPublicacionRouter);

app.listen(port, () => {
    var fs = require('fs');
    var dir = `${__dirname}/images-uploaded`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    console.log(`Started at port ${port}`);
});

module.exports = {
    app
}