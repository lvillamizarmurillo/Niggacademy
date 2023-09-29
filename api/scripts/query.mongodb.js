use('niggacademy_campus');
db.createCollection('usuarios', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ['nombre','apellido','nombreUsuario','correo','password'],
            properties:{
                nombre: {bsonType: 'string',description: 'El nombre es obligatorio y debe ser string'},
                apellido: {bsonType: 'string',description: 'El apellido es obligatorio y debe ser string'},
                nombreUsuario: {bsonType: 'string',description: 'El nombre de usuario es obligatorio y debe ser string'},
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
db.usuarios.createIndex({ correo: 1, nombreUsuario: 1}, { unique: true })

use('niggacademy_campus');
db.usuarios.insertMany([
    {
        nombre: "Carlos",
        apellido: "Chinguiro",
        nombreUsuario: 'MataTejas2000',
        correo: "chinguiro@gmail.com",
        password: "963",
        rol: 1,
        activo: 1,
        permisos: {
            "/usuario": ["1.0.0"],
            "/contenido": ["1.0.0","1.0.1","1.0.2","1.1.0"]
        }
    },
    {
        nombre: "Valentina",
        apellido: "Mentirosa",
        nombreUsuario: 'HoyPongoCachos',
        correo: "me_encanta_mentir@gmail.com",
        password: "123",
        rol: 2,
        activo: 1,
        permisos: {
            "/usuario": ["1.0.0","1.0.1"],
            "/contenido": ['1.0.0','1.0.1','1.0.2','1.0.3','1.0.4']
        }
    },
    {
        nombre: "Juanito",
        apellido: "Alimaña",
        nombreUsuario: 'LaCalleEsUnaCeldaDeCemento',
        correo: "muchaMana@gmail.com",
        password: "321",
        rol: 3,
        activo: 1,
        permisos: {
            "/usuario": ["1.0.0"],
            "/contenido": ["1.0.0","1.0.1","1.0.2","1.1.0"],
            "/admin": ["1.0.10","1.0.11","1.0.12","1.1.13"]
        }
    },
    {
        nombre: "Ludwing",
        apellido: "Villamizar",
        nombreUsuario: 'lvillamizarmurillo',
        correo: "ludsan@gmail.com",
        password: "contraseña",
        rol: 4,
        activo: 1,
        permisos: {
            "/usuario": ["1.0.0"],
            "/contenido": ["1.0.0","1.0.1","1.0.2","1.1.0"],
            "/admin": ["1.0.10","1.0.11","1.0.12","1.1.13","1.0.14","1.0.15","1.0.16","1.0.17","1.0.18","1.0.19"]
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
                        estrellas: {bsonType: 'int',description: 'Las estrellas son requeridas y deben ser un numero entero'}
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
        cursoId: '65166b6335fecd4a72505ef1',
        nombre: "Sección 1: Introducción",
        descripcion: "Aca podras aprender sobre la introduccion a node"
    },
    {
        cursoId: '65166b6335fecd4a72505ef1',
        nombre: "Sección 2: Fundamentos de Node - Primeros pasos",
        descripcion: "Aca podras aprender sobre los fundamentos de node"
    },
    {
        cursoId: '65166b6335fecd4a72505ef1',
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
        seccionId: '65166b9f7cd785d5c53c2a6c',
        nombre: 'Introducción',
        urlVideo: 'aun no se han subido'
    },
    {
        seccionId: '65166b9f7cd785d5c53c2a6c',
        nombre: 'Instalaciones recomendadas',
        urlVideo: 'aun no se han subido'
    },
    {
        seccionId: '65166b9f7cd785d5c53c2a6d',
        nombre: 'Introducción a la sección',
        urlVideo: 'aun no se han subido'
    },
    {
        seccionId: '65166b9f7cd785d5c53c2a6e',
        nombre: 'Introducción a la sección',
        urlVideo: 'aun no se han subido'
    }
])

use('niggacademy_campus');
db.createCollection('comentarios', {
    validator:{
        $jsonSchema: {
            bsonType: 'object',
            required: ['comentario'],
            properties: {
                cursoId: {bsonType: 'string'},
                videoId: {bsonType: 'string'},
                correoUsuario: {bsonType: 'string'},
                comentario: {bsonType: 'string', description: 'El comentario debe ser string y es obligatorio'}
            }
        }
    }
})

use('niggacademy_campus');
db.comentarios.insertMany([
    {
        cursoId: '65166b6335fecd4a72505ef1',
        correoUsuario: 'me_encanta_mentir@gmail.com',
        comentario: 'Me parece genial, sobre todo poruqe es mi curso, le doy 5 estrellas'
    },
    {
        cursoId: '65166b6335fecd4a72505ef1',
        correoUsuario: 'chinguiro@gmail.com',
        comentario: 'Es increible como piratearon este curso'
    },
    {
        videoId: '65166bebe8f59bda47e5850e',
        correoUsuario: 'chinguiro@gmail.com',
        comentario: 'Aqui empieza mi aventura, (Obviamente no puede faltar un comentario genérico)'
    },
    {
        videoId: '65166bebe8f59bda47e5850f',
        correoUsuario: 'muchaMana@gmail.com',
        comentario: 'Este es mi segundo comentario genérico, chispas.'
    },
    {
        videoId: '65166bebe8f59bda47e58510',
        correoUsuario: 'muchaMana@gmail.com',
        comentario: 'Aqui empieza mi aventura, (Obviamente no puede faltar un comentario genérico)'
    },
    {
        videoId: '65166bebe8f59bda47e58511',
        correoUsuario: 'chinguiro@gmail.com',
        comentario: 'Aqui empieza mi aventura, (Obviamente no puede faltar un comentario genérico)'
    }
])

use('niggacademy_campus');
db.createCollection('favoritos', {
    validator:{
        $jsonSchema:{
            bsonType: 'object',
            properties: {
                cursoId: {bsonType: 'string'},
                usuarioId: {bsonType: 'string'},
                nombreCurso: {bsonType: 'string'}
            }
        }
    }
})

use('niggacademy_campus');
db.favoritos.insertMany([
    {
        cursoId: '65166b6335fecd4a72505ef1',
        usuarioId: '65166b26789cc1166c8849ce',
        nombreCurso: 'Nodejs'
    }
])

use('niggacademy_campus');
db.createCollection('respuestas', {
    validator:{
        $jsonSchema: {
            bsonType: 'object',
            required: ['comentario'],
            properties: {
                comentarioId: {bsonType: 'string'},
                correoUsuario: {bsonType: 'string'},
                comentario: {bsonType: 'string', description: 'El comentario debe ser string y es obligatorio'}
            }
        }
    }
})

use('niggacademy_campus');
db.respuestas.insertMany([
    {
        comentarioId: '65166c294c9543c722e388fc',
        correoUsuario: 'me_encanta_mentir@gmail.com',
        comentario: 'No sea sapo'
    }
])

use('niggacademy_campus');
db.createCollection('calificacion', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            properties: {
                nombreCurso: {bsonType: 'string'},
                correoUsuario: {bsonType: 'string'}
            }
        }
    }
})

use('niggacademy_campus');
db.calificacion.insertMany([
    {
        nombreCurso: "Nodejs",
        correoUsuario: "chinguiro@gmail.com"
    }
])