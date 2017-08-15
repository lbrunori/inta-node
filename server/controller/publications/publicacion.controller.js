const { ObjectID } = require('mongodb');
const _ = require('lodash');
const {upload } = require('./../../middleware/uploader');

const Publicacion = require('./../../model/publications/publicacion.model').PublicacionModel;

let savePublicacion = (req, res) => {
    upload(req,res,(err) => {
        if(err){
            console.error(err);
            res.status(404).json({error_code: 4, err_desc: 'Erro al almacenar imagen'});
        }
        
    });
    
    // console.log(req)
    //
    // let body = _.pick(req.body, ['titulo',
    //     'descripcion', 'contenido', 'tipoPublicacion']);
    // body.creador = req.usuario;
    // let publicacion = new Publicacion(body);
    //
    // publicacion.save().then((doc) => {
    //     res.send(doc);
    // }, (err) => {
    //     res.status(400).send(err);
    // })
}

let getPublicacion = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("La ID no es válida");
    }

    Publicacion.findById(id)
        .populate('tipoPublicacion')
        .populate('creador')
        .exec()
        .then((publicacion) => {
            if (!publicacion) {
                return res.status(404).send("Elemento no encontrado");
            }

            res.send({ publicacion });
        }).catch(() => {
            res.status(400).send();
        });
}

let getPublicaciones = (req, res) => {
    Publicacion.find()
        .populate('tipoPublicacion')
        .populate('creador')
        .exec((err, publicaciones) => {
            if (err) {
                res.status(401).send()
            };

            res.send(publicaciones);
        })
}

let deletePublicacion = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("La ID no es válida");
    }

    Publicacion.findByIdAndRemove(id)
        .then((resp) => {
            res.send();
        }).catch((err) => {
            res.status(400).send();
        });

}

let updatePublicacion = (req, res) => {
    let id = req.body._id;
    let body = _.pick(req.body, ['titulo',
        'descripcion', 'contenido', 'tipoPublicacion']);
    body.creador = req.usuario;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Publicacion.findByIdAndUpdate(id, { $set: body }, { new: true }).then((publicacion) => {
        if (!publicacion) {
            return res.status(404).send();
        }
        res.send(publicacion);
    })
}




module.exports = {
    savePublicacion,
    getPublicacion,
    getPublicaciones,
    deletePublicacion,
    updatePublicacion
}

    