import { Router } from "express";
import { validate } from "../../validation/validacionesDefault.js";
import routesVersioning from "express-routes-versioning";
import Secciones from '../../services/secciones.js'
import Videos from '../../services/videos.js'
import Comentarios from "../../services/comentarios.js";

const router = Router();
const version = routesVersioning();

router.get('/:curso', version({'1.0.0': validate(Secciones.getSeccion),'1.0.1': validate(Comentarios.getComentarioCurso),'1.0.2': validate(Comentarios.getRespuesta)}))

router.get('/:curso/:seccion', version({'1.0.0': validate(Videos.getVideo)}))

export {
    router
}