use('niiggacademy_campus');
db.createCollection('usuarios', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ['nombre','apellido','correo','password'],
            properties:{
                nombre: {bsonType: 'string',description: 'El nombre es obligatorio y debe ser string'},
                apellido: {bsonType: 'string',description: 'El apellido es obligatorio y debe ser string'},
                correo: {bsonType: 'string',description: 'El correo es obligatorio y debe ser string'},
                password: {bsonType: 'string',description: 'El password es obligatorio y debe ser string'},
                rol: {bsonType: 'int',enum: [1,2,3,4]},
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