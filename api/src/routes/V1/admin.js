import { Router } from "express";
import routesVersioning from "express-routes-versioning";
import { validate } from "../../validation/validacionesDefault.js";
import passportHelper from "../../config/passportHelper.js";
import Usuarios from "../../services/usuario.js";

const router = Router();
const version = routesVersioning();

router.use(passportHelper.authenticate('bearer', {session: false}));

router.get('/',version({'1.0.10': validate(Usuarios.getAllUsuarios),'1.0.11': validate(Usuarios.getAllUsuariosNormales),'1.0.12': validate(Usuarios.getAllUsuariosCursos),'1.0.15': validate(Usuarios.getAllUsuariosTotal),'1.0.16': validate(Usuarios.getAllUsuariosAdmin)}))

router.post('/registro', version({'1.0.15': validate(Usuarios.postAdmin)}))

router.delete('/', version({'1.0.15': validate(Usuarios.deleteUser),'1.0.16': validate(Usuarios.deleteCurso),'1.0.17': validate(Usuarios.deleteCursosInactivos),'1.0.18': validate(Usuarios.deleteUsersInactivos)}))

export {
    router
}