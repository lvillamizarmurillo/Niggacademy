import { Router } from "express";
import { validate } from "../../validation/validacionesDefault.js";
import routesVersioning from "express-routes-versioning";
import passportHelper from '../../config/passportHelper.js';
import Secciones from '../../services/secciones.js'
import Videos from '../../services/videos.js'
import Comentarios from "../../services/comentarios.js";
import Cursos from "../../services/cursos.js";
import Usuarios from "../../services/usuario.js";

const router = Router();
const version = routesVersioning();

router.use(passportHelper.authenticate('bearer', {session: false}));

router.get('/:curso', version({'1.0.0': validate(Secciones.getSeccion),'1.0.1': validate(Comentarios.getComentarioCurso),'1.0.2': validate(Comentarios.getRespuesta)}))//ya 1.0.0,1.0.1,1.0.2

router.put('/:curso', version({'1.0.3': validate(Cursos.actualizarCurso)}))

router.post('/:curso', version({'1.0.0': validate(Comentarios.postComentarioCurso),'1.0.1': validate(Comentarios.postRespuesta),'1.0.2': validate(Usuarios.postFavorito),'1.1.0': validate(Cursos.postCalificacion),'1.0.3': validate(Secciones.postSeccion)}))//ya 1.0.0,1.0.1,1.0.2,1.1.0

router.delete('/:curso', version({'1.0.0': validate(Comentarios.deleteComentario),'1.0.1': validate(Comentarios.deleteRespuesta),'1.0.4': validate(Secciones.deleteSeccion)}))

router.get('/:curso/:seccion', version({'1.0.0': validate(Videos.getVideos)}))

router.post('/:curso/:seccion', version({'1.0.3': validate(Videos.postVideo)}))

router.delete('/:curso/:seccion', version({'1.0.3': validate(Videos.deleteVideo)}))

router.get('/:curso/:seccion/:video', version({'1.0.0': validate(Videos.getVideoSolo),'1.0.1': validate(Comentarios.getComentarioVideo),'1.0.2': validate(Comentarios.getRespuesta)}))

router.post('/:curso/:seccion/:video', version({'1.0.0': validate(Comentarios.postComentarioVideo),'1.0.1': validate(Comentarios.postRespuesta)}))

router.delete('/:curso/:seccion/:video', version({'1.0.0': validate(Comentarios.deleteComentario),'1.0.1': validate(Comentarios.deleteRespuesta)}))

export {
    router
}