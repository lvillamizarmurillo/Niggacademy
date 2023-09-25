import { Router } from "express";
import routesVersioning from "express-routes-versioning";
import Cursos from '../../services/cursos.js';
import {validate} from '../../validation/validacionesDefault.js'

const router = Router();
const version = routesVersioning();

router.get('/', version({'1.0.0': validate(Cursos.getCursos)}))

export {
    router
}