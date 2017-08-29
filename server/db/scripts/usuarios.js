var usuario = /* 1 */
    {
        "_id": ObjectId("598b69bf36791262e4a91a81"),
        "nombre": "Lucas",
        "apellido": "Brunori",
        "email": "lucasb.93@gmail.com",
        "password": "$2a$10$7T9jNQbWKIiIRb4pY72BkO3N.Zq/ZKPzhY2fdEtZFYznPHZ9rUbYG",
        "rol": ObjectId("598b68c5b4c9ee255f3d50a5"),
        "tokens": [
        ],
        "__v": 5
    };

db.usuarios.insert(usuario);