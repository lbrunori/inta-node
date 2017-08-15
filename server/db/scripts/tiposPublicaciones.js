var tipoPublicaciones = [
    /* 1 */
    {
        "_id": ObjectId("598b71524cee1ed59c9ae5c0"),
        "nombre": "Noticia",
        "nombreDescriptivo": "Noticia"
    },

    /* 2 */
    {
        "_id": ObjectId("598b71524cee1ed59c9ae5c1"),
        "nombre": "Estadisticas",
        "nombreDescriptivo": "Estadísticas"
    },

    /* 3 */
    {
        "_id": ObjectId("598b71524cee1ed59c9ae5c2"),
        "nombre": "InformacionTecnica",
        "nombreDescriptivo": "Información Técnica"
    },

    /* 4 */
    {
        "_id": ObjectId("598b71524cee1ed59c9ae5c3"),
        "nombre": "Proyectos",
        "nombreDescriptivo": "Proyectos"
    }
];

db.tipopublicacions.insert(tipoPublicaciones);