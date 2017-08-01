let express = require('express');
let bodyParser = require('body-parser');
let { ObjectID } = require('mongodb');

let { mongoose } = require('./db/mongoose');
let { PublicacionView } = require('./view/publications/publicacion.view')

app = express();

app.use(bodyParser.json());


app.use('/api', PublicacionView);

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
}
