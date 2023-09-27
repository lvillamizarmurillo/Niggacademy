import db from '../config/connectMongo.js';

const curso = db.getInstancia().elegirColeccion('cursos').conectar();
const comentario = db.getInstancia().elegirColeccion('comentarios').conectar();
const respuesta = db.getInstancia().elegirColeccion('respuestas').conectar();

export default class Comentarios {
    static async getComentarioCurso(req,res){
        const consulta = await curso.findOne({nombre: req.params.curso})
        const data = await comentario.aggregate([
            {
                $match: {cursoId: consulta._id.toString()}
            },
            {
                $project: {
                    _id: 0,
                    "codigo": "$_id",
                    "correo": "$correoUsuario",
                    "descripcion": "$comentario"    
                }
            }
        ]).toArray();
        res.status(200).send(data)
    }
    static async getRespuesta(req,res){
        const data = await respuesta.aggregate([
            {
                $match: {comentarioId: req.body.codigo}
            },
            {
                $project: {
                    _id: 0,
                    comentarioId: 0
                }
            }
        ]).toArray();
        console.log(req.body.codigo);
        res.status(200).send(data)
    }
}