import { Router } from "express";
import routesVersioning from "express-routes-versioning";
import Usuarios from '../../services/usuario.js';
import {validate} from '../../validation/validacionesDefault.js';
import passportHelper from '../../config/passportHelper.js';
import Cursos from '../../services/cursos.js';

const router = Router();
const version = routesVersioning();

router.use(passportHelper.authenticate('bearer', {session: false}));

router.get('/info', version({'1.0.0': validate(Usuarios.getInformacion),'1.0.1': validate(Cursos.infoCurso)}));

router.post('/agregar',version({'1.0.0': validate(Cursos.postCurso)}));

router.put('/info', version({'1.0.0': validate(Usuarios.putUsuario)}));

router.delete('/info', version({'1.0.0': validate(Usuarios.deleteUsuarios)}));

router.get('/favoritos', version({'1.0.0': validate(Usuarios.getFavoritos)}));

export {
    router
}