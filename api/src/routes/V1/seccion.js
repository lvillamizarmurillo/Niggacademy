import { Router } from "express";
import { validate } from "../../validation/validacionesDefault.js";
import routesVersioning from "express-routes-versioning";
import Secciones from '../../services/secciones.js'

const router = Router();
const version = routesVersioning();

router.get('/:curso', version({'1.0.0': validate(Secciones.getSeccion)}))

router.get('/:curso/:seccion', version({'1.0.0': validate(Secciones.getVideo)}))

export {
    router
}