use('niggacademy_campus');
db.createCollection('usuarios', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ['nombre','apellido','correo','password'],
            properties:{
                nombre: {bsonType: 'string',description: 'El nombre es obligatorio y debe ser string'},
                apellido: {bsonType: 'string',description: 'El apellido es obligatorio y debe ser string'},
                correo: {bsonType: 'string',pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",description: 'El correo es obligatorio y debe ser string'},
                password: {bsonType: 'string',description: 'El password es obligatorio y debe ser string'},
                rol: {bsonType: 'int',enum: [1,2,3,4]},
                activo: {bsonType: 'int', enum: [0,1]},
                permisos: {
                    bsonType: 'object',
                    description: "Ingrese los permisos",
                    properties: {
                        "/usuario": {
                            bsonType: "array",
                            items: {
                                bsonType: 'string',
                                description: "Agregue las versiones disponibles"
                            }
                        }
                    }
                }
            }
        }
    }
})
db.usuarios.createIndex({ correo: 1 }, { unique: true })

use('niggacademy_campus');
db.usuarios.insertMany([
    {
        nombre: "Ludwing",
        apellido: "Villamizar",
        correo: "ludsan@gmail.com",
        password: "contraseña",
        rol: 4,
        activo: 1,
        permisos: {
            "/usuarios": ["1.0.0","1.0.1","1.0.2"]
        }
    },
    {
        nombre: "Carlos",
        apellido: "Chinguiro",
        correo: "chinguiro@gmail.com",
        password: "963",
        rol: 1,
        activo: 1,
        permisos: {
            "/usuarios": ["1.0.0"]
        }
    },
    {
        nombre: "Valentina",
        apellido: "Mentirosa",
        correo: "me_encanta_mentir@gmail.com",
        password: "123",
        rol: 2,
        activo: 1,
        permisos: {
            "/usuarios": ["1.0.0"]
        }
    },
    {
        nombre: "Juanito",
        apellido: "Alimaña",
        correo: "mucha_maña@gmail.com",
        password: "321",
        rol: 3,
        activo: 1,
        permisos: {
            "/usuarios": ["1.0.0","1.0.1"]
        }
    }
])

db.createCollection('cursos', {
    validation: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['nombre','']
        }
    }
})