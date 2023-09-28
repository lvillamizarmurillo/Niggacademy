import { Router } from "express";
import routesVersioning from "express-routes-versioning";
import Usuarios from '../../services/usuario.js';
import {validate} from '../../validation/validacionesDefault.js';
import passportHelper from '../../config/passportHelper.js';
import Cursos from '../../services/cursos.js';

const router = Router();
const version = routesVersioning();

router.use(passportHelper.authenticate('bearer', {session: false}));

router.get('/info', version({'1.0.0': validate(Usuarios.getInformacion),'1.0.1': validate(Cursos.infoCurso)}));//ya 1.0.0, 1.0.1

router.post('/agregar',version({'1.0.0': validate(Cursos.postCurso)}));//ya

router.put('/info', version({'1.0.0': validate(Usuarios.putUsuario)}));//ya

router.delete('/info', version({'1.0.0': validate(Usuarios.deleteUsuarios),'1.0.1': validate(Cursos.deleteCurso)}));//ya 1.0.0, 1.0.1

router.get('/favoritos', version({'1.0.0': validate(Usuarios.getFavoritos)}));

router.delete('/favoritos', version({'1.0.0': validate(Usuarios.deleteFavoritos)}));

export {
    router
}