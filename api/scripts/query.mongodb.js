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

use('niggacademy_campus');
db.createCollection('cursos', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['nombre','descripcion'],
            properties: {
                nombre: {bsonType: 'string', description: 'El nombre del curso es necesario y debe ser string'},
                descripcion: {bsonType: 'string', description: 'La descripcion del curso es necesario y debe ser string'},
                calificacion: {
                    bsonType: 'object',
                    required: ['contador','estrellas'],
                    properties: {
                        contador: {bsonType: 'int',description: 'El contador es requerido y debe ser entero'},
                        estrellas: {bsonType: 'int',enum: [0,1,2,3,4,5],description: 'Las estrellas son requeridas y deben ser un numero entero'}
                    }
                },
                correo: {bsonType: 'string',pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",description: 'El correo es obligatorio y debe ser string'},
                activo: {bsonType: 'int', enum: [0,1]}
            }
        }
    }
})

use('niggacademy_campus');
db.cursos.insertMany([
    {
        nombre: "Nodejs",
        descripcion: "Aca podras aprender sobre Nodejs desde cero",
        calificacion: {
            contador: 3,
            estrellas: 4
        },
        correo: "me_encanta_mentir@gmail.com",
        activo: 1
    }
])

use('niggacademy_campus');
db.createCollection('secciones', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['nombre','descripcion'],
            properties: {
                cursoId: {bsonType: 'string'},
                nombre: {bsonType: 'string', description: 'El nombre del curso es necesario y debe ser string'},
                descripcion: {bsonType: 'string', description: 'La descripcion del curso es necesario y debe ser string'}
            }
        }
    }
})

use('niggacademy_campus');
db.secciones.insertMany([
    {
        cursoId: '650cbeee4d409afeacfeb334',
        nombre: "Sección 1: Introducción",
        descripcion: "Aca podras aprender sobre la introduccion a node"
    },
    {
        cursoId: '650cbeee4d409afeacfeb334',
        nombre: "Sección 2: Fundamentos de Node - Primeros pasos",
        descripcion: "Aca podras aprender sobre los fundamentos de node"
    },
    {
        cursoId: '650cbeee4d409afeacfeb334',
        nombre: "Sección 3: Desarrollando en Node",
        descripcion: "Aca podras aprender sobre como desarrollar en node"
    }
])

use('niggacademy_campus');
db.createCollection('videos', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['nombre','urlVideo'],
            properties: {
                seccionId: {bsonType: 'string'},
                nombre: {bsonType: 'string',description: 'El nombre es obligatorio y debe ser string'},
                urlVideo: {bsonType: 'string', description: 'La descripcion es obligatoria y debe ser string'}
            }
        }
    }
})

use('niggacademy_campus');
db.videos.insertMany([
    {
        seccionId: '650d18c637ee28a5ad9315f1',
        nombre: 'Introducción',
        urlVideo: 'aun no se han subido'
    },
    {
        seccionId: '650d18c637ee28a5ad9315f1',
        nombre: 'Instalaciones recomendadas',
        urlVideo: 'aun no se han subido'
    },
    {
        seccionId: '650cbeee4d409afeacfeb334',
        nombre: 'Introducción a la sección',
        urlVideo: 'aun no se han subido'
    },
    {
        seccionId: '650d18c637ee28a5ad9315f3',
        nombre: 'Introducción a la sección',
        urlVideo: 'aun no se han subido'
    }
])