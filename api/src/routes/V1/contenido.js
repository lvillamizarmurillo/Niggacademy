import { Router } from "express";
import { validate } from "../../validation/validacionesDefault.js";
import routesVersioning from "express-routes-versioning";
import Secciones from '../../services/secciones.js'
import Videos from '../../services/videos.js'
import Comentarios from "../../services/comentarios.js";
import Cursos from "../../services/cursos.js";

const router = Router();
const version = routesVersioning();

router.get('/:curso', version({'1.0.0': validate(Secciones.getSeccion),'1.0.1': validate(Comentarios.getComentarioCurso),'1.0.2': validate(Comentarios.getRespuesta)}))

router.put('/:curso', version({'1.0.3': validate(Cursos.actualizarCurso)}))

router.delete('/:curso', version({'1.0.3': validate(Cursos.deleteCurso)}))

router.post('/:curso', version({'1.0.3': validate(Secciones.postSeccion)}))

router.delete('/:curso', version({'1.0.4': validate(Secciones.deleteSeccion)}))

router.get('/:curso/:seccion', version({'1.0.0': validate(Videos.getVideos)}))

router.post('/:curso/:seccion', version({'1.0.3': validate(Videos.postVideo)}))

router.delete('/:curso/:seccion', version({'1.0.3': validate(Videos.deleteVideo)}))

router.get('/:curso/:seccion/:video', version({'1.0.0': validate(Videos.getVideoSolo),'1.0.1': validate(Comentarios.getComentarioVideo),'1.0.2': validate(Comentarios.getRespuesta)}))

export {
    router
}