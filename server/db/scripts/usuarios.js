var usuario = /* 1 */
    {
        "_id": ObjectId("598b69bf36791262e4a91a81"),
        "nombre": "Lucas",
        "apellido": "Brunori",
        "email": "lucasb.93@gmail.com",
        "password": "$2a$10$7T9jNQbWKIiIRb4pY72BkO3N.Zq/ZKPzhY2fdEtZFYznPHZ9rUbYG",
        "rol": ObjectId("598b68c5b4c9ee255f3d50a5"),
        "tokens": [
            {
                "access": "auth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OThiNjliZjM2NzkxMjYyZTRhOTFhODEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTAyMzA4Nzk5LCJleHAiOjE1MDIzOTUxOTl9.js-iDbnri7DmT6wsCN6Nhl0jkw14eCTTHGN-2IosiBA",
                "_id": ObjectId("598b69bf36791262e4a91a82")
            },
            {
                "access": "auth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OThiNjliZjM2NzkxMjYyZTRhOTFhODEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTAyMzA4ODI2LCJleHAiOjE1MDIzOTUyMjZ9.Fbv1-De8CPtlyMNjGZDOL8zy1djwEW-HI4cA9KvPZR8",
                "_id": ObjectId("598b69da36791262e4a91a83")
            },
            {
                "access": "auth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OThiNjliZjM2NzkxMjYyZTRhOTFhODEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTAyMzA5ODk1LCJleHAiOjE1MDIzOTYyOTV9.xvutnk66nIFmORvFfJ9mG42hZZjkr-_tFdl4S40X91Q",
                "_id": ObjectId("598b6e07a90b9b68c649b750")
            },
            {
                "access": "auth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OThiNjliZjM2NzkxMjYyZTRhOTFhODEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTAyMzA5OTkzLCJleHAiOjE1MDIzOTYzOTN9.L76ViQieD1hTygpb49HXR5MZGx8GCZWFSuUAV17--BE",
                "_id": ObjectId("598b6e69928324690082aaca")
            },
            {
                "access": "auth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OThiNjliZjM2NzkxMjYyZTRhOTFhODEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTAyMzEwMDUxLCJleHAiOjE1MDIzOTY0NTF9.xYj5UyPLshuQ62xBW_DCO2H0pUOTJnxAQS1QsCBR0o8",
                "_id": ObjectId("598b6ea3928324690082aacb")
            }
        ],
        "__v": 5
    };

db.usuarios.insert(usuario);