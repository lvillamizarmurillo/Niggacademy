import { Router } from "express";
import routesVersioning from "express-routes-versioning";
import Usuarios from '../../services/usuario.js';
import {validate} from '../../validation/validacionesDefault.js';
import passportHelper from '../../config/passportHelper.js';

const router = Router();
const version = routesVersioning();

router.use(passportHelper.authenticate('bearer', {session: false}));
router.get('/info', version({'1.0.0': validate(Usuarios.getInformacion)}));

export {
    router
}