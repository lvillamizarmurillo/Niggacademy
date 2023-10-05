------

# Niggacademy

Niggacademy es una plataforma de cursos en línea que ofrece una amplia variedad de cursos sobre diversos temas. Esta plataforma permite a los usuarios registrarse, acceder a cursos, marcar cursos como favoritos, calificarlos, crear sus propios cursos, cargar secciones y videos, comentar cursos y videos, y gestionar roles de administrador.

## Funcionalidades del Backend

El backend de Niggacademy se ha desarrollado de manera exhaustiva para proporcionar una experiencia completa en la plataforma. Algunas de las funcionalidades clave incluyen:

- **Autenticación mediante JWT**: Los usuarios pueden registrarse e iniciar sesión de forma segura utilizando JSON Web Tokens (JWT).
- **Gestión de Cursos**: Los usuarios pueden crear sus propios cursos, añadirlos a favoritos y calificarlos.
- **Gestión de Secciones y Videos**: Dentro de un curso, los usuarios pueden agregar secciones y cargar videos. También pueden eliminar videos si es necesario.
- **Comentarios y Respuestas**: Los usuarios pueden comentar en cursos y videos, así como responder a los comentarios de otros usuarios.
- **Roles de Administrador**: La plataforma cuenta con roles de administrador para gestionar usuarios, cursos y comentarios.

## Funcionalidades del Frontend

El frontend de Niggacademy se encuentra en una etapa inicial y actualmente incluye las siguientes funcionalidades:

- **Inicio de Sesión y Registro de Usuarios**: Los usuarios pueden crear cuentas y acceder a la plataforma de manera segura.
- **Página de Inicio (Home)**: En la página de inicio, los usuarios pueden ver la lista de cursos disponibles.
- **Detalles del Curso**: Al hacer clic en un curso, los usuarios pueden ver las secciones disponibles.
- **Visualización de Videos y Comentarios**: Al acceder a una sección, los usuarios pueden ver la lista de videos disponibles y comentar sobre el curso y los videos.
- **Diseño Responsivo**: La plataforma es completamente responsiva para adaptarse a diferentes dispositivos.

## Subida de Videos

Niggacademy permite a los usuarios cargar videos en dos formatos diferentes para cada sección de un curso. Los detalles específicos sobre los formatos admitidos y los requisitos técnicos se proporcionarán en la documentación detallada del proyecto.

## Próximos Pasos

El desarrollo del frontend de Niggacademy está en curso, y próximamente se integrarán más funcionalidades. Esto incluirá la interacción con los endpoints del backend para lograr una experiencia completa de usuario.

Para obtener información adicional sobre los endpoints y cómo consumirlos desde el frontend, consulta la documentación del proyecto que estará disponible próximamente.

¡Gracias por interesarte en Niggacademy! Esperamos que esta plataforma sea una fuente valiosa de conocimiento y aprendizaje en línea. Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto con nosotros.

## Necesario para probar el backend

1.Se instalan las dependencias del package.json con el siguiente comando:

```
npm i
```



1. Se debe poner en la variable .env.example, luego renombrarlo unicamente como .env

```
VITE_PORT_BACKEND = 5072
URI_MONGODB = ''
JWT = ''
VITE_PORT_FRONTEND = 5073
VITE_HOSTNAME = '127.16.15.14'
```



1. Para correr el servidor se usa el comando:

```
npm run start
```

# MongoDb

Antes de iniciar, debe por el documento que hay en scrips ejecutar lo siguiente:

```
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
```

## Uso

Para cualquier consulta se debe loguear con el siguiente usuario:

Post

version: 1.0.0

```
http://127.16.15.14:5072/niggacademy/login
```



Seguido en el body colocar el siguiente usuario,(Este es admin superior, en el ultimo apartado de endpoints es recomendable loguearse con este usuario para que tenga acceso a todos los permisos especiales, ya que un admin normal solo puede hacer gets)

```
{
  "email": "ludsan@gmail.com",
  "password": "contraseña"
}
```

Para registrar un usuariose usa el siguiente link(opcional):

version: 1.0.0

Post

```
http://127.16.15.14:5072/niggacademy/registro
```

```
{
  "nombre": "Miguelito",
  "apellido": "Sanchez",
  "nombreUsuario": "EnmiMakinaFunciona",
  "correo": "prueba@gmail.com",
  "password": "123"
}
```



Luego el token generado se debera colocar en Auth/BearerToken

Ej:

```
sauhdusaihdiuahsiudyhsaoiudjaisdsanlkjdnaskjhdijsahdkjhsakjdhsakjhdkjashd
```



O en headers colocar Authorization seguido de Bearer (token)

Ej:

```
Authorization:   Bearer sjahdiuashdiuahsodijsaoijdsioajdoijdoiasjdoijasoijdoiasoidjsa
```

# Consultas

1. Encontrar todos los cursos de la base de datos:

   version: 1.0.0

Get

```
http://127.16.15.14:5072/niggacademy/home
```



2. Encontrar un curso en especifico por el nombre:

version: 1.0.0

Post

```
http://127.16.15.14:5072/niggacademy/home
```

```
{
	"nombre": "Nodejs"
}
```

3. Informacion de los datos del usuario con el que se logueo:

version: 1.0.0

Get

```
http://127.16.15.14:5072/niggacademy/usuario/info
```

4. Informacion de los datos del curso del usuario con el que se logueo(Solo sirve si tienes registrado un curso a su nombre):

version: 1.0.1

Get

```
http://127.16.15.14:5072/niggacademy/usuario/info
```

5. Informacion de los datos de los curso que el usuario añadio a favoritos:

version: 1.0.0

Get

```
http://127.16.15.14:5072/niggacademy/usuario/favoritos
```

6. Agrega un curso a un usuario normal(Esta validado para que solo un usuario normal que no tenga curso, o hubiera tenido pero lo elimino, se pueda agregar):

version: 1.0.0

Post

```
http://127.16.15.14:5072/niggacademy/usuario/agregar
```

```
{
  "nombre": "CursoPrueba",
  "descripcion": "Aca podras aprender sobre esta prueba desde cero"
}
```

7. Actualiza la informacion del usuario logueado:

version: 1.0.0

Put

```
http://127.16.15.14:5072/niggacademy/usuario/info
```

```
{
  "nombre": "Miguelito2",
  "apellido": "Sanchez2",
  "nombreUsuario": "EnmiMakinaFunciona2",
  "correo": "prueba@gmail.com",
  "password": "123"
}
```

8. Actualiza la informacion del curso del usuario logueado:

version: 1.0.1

Put

```
http://127.16.15.14:5072/niggacademy/usuario/info
```

```
{
  "nombre": "CursoPrueba2",
  "descripcion": "Aca podras aprender sobre esta prueba desde cero2"
}
```

9. Elimina la informacion del usuario logueado(Si lo hace, tendra que loguearse de nuevo ya que si no, no puede acceder a ningun endpoint):

version: 1.0.0

Delete

```
http://127.16.15.14:5072/niggacademy/usuario/info
```

```
{
  "confirmacion": "confirmar"
}
```

10. Elimina la informacion del curso del usuario logueado(Si lo hace, ten en cuenta que ya podria registrar un curso a su nombre nuevamente, y este endpoint solo sirve si ya tiene un curso registrado a su nombre):

version: 1.0.1

Delete

```
http://127.16.15.14:5072/niggacademy/usuario/info
```

```
{
  "confirmacion": "confirmar"
}
```

11. Elimina el curso de la lista de favoritos del usuario(para que sirva primero debe registrar algun curso a favoritos, se puede en endpoints siguientes):

version: 1.0.0

Delete

```
http://127.16.15.14:5072/niggacademy/usuario/favoritos
```

```
{
  "nombre": "Nodejs"
}
```

12. Trae las secciones que hay en el curso(Si no hay, se pueden agregar en los siguentes endpoints):

version: 1.0.0

Get

```
http://127.16.15.14:5072/niggacademy/contenido/:curso
```

13. Trae los comentarios que la comunidad ha dejado sobre el curso(Si no hay, se pueden agregar en los siguentes endpoints):

version: 1.0.1

Get

```
http://127.16.15.14:5072/niggacademy/contenido/:curso
```

14. Trae las respuestas a un comentario(Si no hay, se pueden agregar en los siguentes endpoints, y es necesario en el endpoint anterior guardar el codigo de algun comentario para ver las respuestas de este):

version: 1.0.2

Get

```
http://127.16.15.14:5072/niggacademy/contenido/:curso
```

```
{
	"codigo": "asjdoiasjdoias"
}
```

15. Agrega un comentario al curso:

version: 1.0.0

Post

```
http://127.16.15.14:5072/niggacademy/contenido/:curso
```

```
{
  "comentario": "Algun comentario"
}
```

16. Agrega una respuesta a un comentario(Se debe poner el codigo de un comentario, este se obtiene de los gets anteriores):

version: 1.0.1

Post

```
http://127.16.15.14:5072/niggacademy/contenido/:curso
```

```
{
  "comentarioId": "sfdsdfsfsd"
  "comentario": "Algun comentario"
}
```

17. Agrega el curso a favoritos automaticamente sin poner nada:

version: 1.0.2

Post

```
http://127.16.15.14:5072/niggacademy/contenido/:curso
```

18. Agrega una calificacion al curso(Solo es de 1 a 5, y solo se puede calificar una unica vez por cuenta, ya esta validado):

version: 1.1.0

Post

```
http://127.16.15.14:5072/niggacademy/contenido/:curso
```

```
{
  "calificacion": 4
}
```

19. Agrega una seccion al curso(Solo sirve para el usuario dueño del curso, ya esta validado):

version: 1.0.3

Post

```
http://127.16.15.14:5072/niggacademy/contenido/:curso
```

```
{
  "nombre": "Sección 1: Prueba",
  "descripcion": "Aca podras aprender sobre los fundamentos de algo"
}
```

20. Elimina un comentario(Solo sirve para el usuario dueño del comentario, ya esta validado, el codigo se consigue en gets de comentarios):

version: 1.0.0

Delete

```
http://127.16.15.14:5072/niggacademy/contenido/:curso
```

```
{
  "codigo": "sdfsdfsdfdsf"
}
```

21. Elimina una respuesta a un comentario(Solo sirve para el usuario dueño del comentario, ya esta validado, el codigo se consigue en gets anteriores):

version: 1.0.1

Delete

```
http://127.16.15.14:5072/niggacademy/contenido/:curso
```

```
{
  "codigo": "sdfsdfsdfdsf"
}
```

21. Elimina una seccion del curso(Solo sirve para el usuario dueño del curso, ya esta validado):

version: 1.0.4

Delete

```
http://127.16.15.14:5072/niggacademy/contenido/:curso
```

```
{
  "nombre": "nombre de la seccion"
}
```

22. Trae los video que hay en la seccion del curso(Si no hay, se pueden agregar en los siguentes endpoints):

version: 1.0.0

Get

```
http://127.16.15.14:5072/niggacademy/contenido/:curso/:seccion
```

23. Agrega un video a la seccion(Solo sirve para el usuario dueño del curso, ya esta validado):

version: 1.0.3

Post

```
http://127.16.15.14:5072/niggacademy/contenido/:curso/:seccion
```

```
{
  "nombre": "Introducción a la sección",
  "urlVideo": "https://www.youtube.com/embed/R5cbxTPZNL0?si=LXIoKgYzGhr1u9s7"
}
```

24. Elimina un video a la seccion(Solo sirve para el usuario dueño del curso, ya esta validado):

version: 1.0.3

Delete

```
http://127.16.15.14:5072/niggacademy/contenido/:curso/:seccion
```

```
{
  "nombre": "Nombre del video"
}
```

25. Trae la info del video:

version: 1.0.0

Get

```
http://127.16.15.14:5072/niggacademy/contenido/:curso/:seccion/:video
```

26. Trae los comentarios del video(Si no hay, se pueden agregar en endpoints siguientes):

version: 1.0.1

Get

```
http://127.16.15.14:5072/niggacademy/contenido/:curso/:seccion/:video
```

27. Trae las respuestas a los comentarios del video(Si no hay, se pueden agregar en endpoints siguientes, y el codigo se obtiene del endpoint anterior):

version: 1.0.2

Get

```
http://127.16.15.14:5072/niggacademy/contenido/:curso/:seccion/:video
```

```
{
	"codigo": "sfdfsdfsdfsd"
}
```

27. Agrega un comentario sobre el video en cuestion:

version: 1.0.0

Post

```
http://127.16.15.14:5072/niggacademy/contenido/:curso/:seccion/:video
```

```
{
	"comentario": "Este es el comentario mas generico que hay"
}
```

28. Agrega una respuesta a un comentario sobre el video en cuestion(El codigo se obtiene de gets anteriores):

version: 1.0.1

Post

```
http://127.16.15.14:5072/niggacademy/contenido/:curso/:seccion/:video
```

```
{
	"comentarioId": "dsfsdfhsdjfh",
	"comentario": "Este es el comentario mas generico que hay"
}
```

29. Elimina un comentario del video(Esta validado para que solo el usuario dueño del comentario pueda eliminarlo, y el codigo se obtiene de gets anteriores):

version: 1.0.0

Delete

```
http://127.16.15.14:5072/niggacademy/contenido/:curso/:seccion/:video
```

```
{
	"codigo": "dsfsdfhsdjfh"
}
```

30. Elimina una respuesta a un comentario del video(Esta validado para que solo el usuario dueño del comentario pueda eliminarlo, y el codigo se obtiene de gets anteriores):

version: 1.0.1

Delete

```
http://127.16.15.14:5072/niggacademy/contenido/:curso/:seccion/:video
```

```
{
	"codigo": "dsfsdfhsdjfh"
}
```

**Es recomendable para usar estos endpoints sin problemas, estar logueado con el usuario recomendado al comienzo del readme**

31. Trae todos los usuarios en la base de datos, excluyendo a los de rol admin y admin superior:

version: 1.0.10

Get

```
http://127.16.15.14:5072/niggacademy/admin
```

32. Trae unicamente a los usuarios normales(Es decir que no tienen registrado un curso a su nombre):

version: 1.0.11

Get

```
http://127.16.15.14:5072/niggacademy/admin
```

33. Trae unicamente a los usuarios especiales(Es decir que tienen registrado un curso a su nombre):

version: 1.0.12

Get

```
http://127.16.15.14:5072/niggacademy/admin
```

34. Trae todos los usuarios en la base de datos, excluyendo a los admin superior:

version: 1.0.15

Get

```
http://127.16.15.14:5072/niggacademy/admin
```

35. Trae unicamente a los usuarios con el rol de admin:

version: 1.0.16

Get

```
http://127.16.15.14:5072/niggacademy/admin
```

36. Agrega a la base de datos a un usuario con los permisos y el rol de admin:

version: 1.0.15

Post

```
http://127.16.15.14:5072/niggacademy/admin/registro
```

```
{
  "nombre": "admin",
  "apellido": "Hacker",
  "nombreUsuario": "Anonimus",
  "correo": "admin@gmail.com",
  "password": "963"
}
```

37. Elimina a un usuario de la base de datos, y si tiene un curso a su nombre tambien lo elimina(Para esto necesita el email del usuario):

version: 1.0.15

Delete

```
http://127.16.15.14:5072/niggacademy/admin
```

```
{
  "correo": "user@gmail.com"
}
```

38. Elimina un curso de la base de datos(Para esto necesita el email del usuario y el nombre del curso):

version: 1.0.16

Delete

```
http://127.16.15.14:5072/niggacademy/admin
```

```
{
  "correo": "user@gmail.com",
  "nombre": "Nombre del curso"
}
```

39. Elimina todos los cursos inactivos(Esto se debe a que en realidad cuando un usuario elimina un curso, aun se guarda la info en la base de datos, pero pasa de activo a inactivo, este endpoint sirve para limpiar espacio eliminando todos los cursos en estado inactivo):

version: 1.0.17

Delete

```
http://127.16.15.14:5072/niggacademy/admin
```

```
{
  "confirmacion": "confirmar"
}
```

40. Elimina todos los usuarios inactivos(Esto se debe a que en realidad cuando un usuario elimina la cuenta, aun se guarda la info en la base de datos, pero pasa de activo a inactivo, este endpoint sirve para limpiar espacio eliminando todos los usuarios en estado inactivo):

version: 1.0.18

Delete

```
http://127.16.15.14:5072/niggacademy/admin
```

```
{
  "confirmacion": "confirmar"
}
```
