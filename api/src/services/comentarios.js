import { ObjectId } from 'mongodb';
import db from '../config/connectMongo.js';
import { traerUserLogin } from '../utils/funcionesGlobales.js';

const curso = db.getInstancia().elegirColeccion('cursos').conectar();
const comentario = db.getInstancia().elegirColeccion('comentarios').conectar();
const respuesta = db.getInstancia().elegirColeccion('respuestas').conectar();
const video = db.getInstancia().elegirColeccion('videos').conectar();

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
    static async getComentarioVideo(req,res){
        const consulta = await video.findOne({nombre: req.params.video})
        const data = await comentario.aggregate([
            {
                $match: {videoId: consulta._id.toString()}
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
                    "codigo": "$_id",
                    comentarioId: 0,
                    correoUsuario: 1,
                    comentario: 1
                }
            }
        ]).toArray();
        res.status(200).send(data)
    }
    static async postComentarioCurso(req,res){
        const user = await traerUserLogin(req);
        const consulta = await curso.findOne({nombre: req.params.curso});
        req.body.cursoId = consulta._id.toString();
        req.body.correoUsuario = user.correo;
        await comentario.insertOne(req.body);
        res.status(200).send('Comentario guardado con exito.');
    }
    static async postComentarioVideo(req,res){
        const user = await traerUserLogin(req);
        const consulta = await video.findOne({nombre: req.params.video});
        req.body.videoId = consulta._id.toString();
        req.body.correoUsuario = user.correo;
        await comentario.insertOne(req.body);
        res.status(200).send('Comentario guardado con exito.');
    }
    static async deleteComentario(req,res){
        const user = await traerUserLogin(req);
        if(!req.body.codigo) return res.status(400).send('Ingrese el codigo del comentario a eliminar.');
        const consulta = await comentario.findOne({_id: new ObjectId(req.body.codigo),correoUsuario: user.correo})
        if(!consulta) return res.status(400).send('Este comentario no te pertenece, no lo puedes eliminar.');
        await comentario.deleteOne({_id: new ObjectId(req.body.codigo)})
        res.status(400).send('Comentario eliminado con exito.');
    }
    static async postRespuesta(req,res){
        const user = await traerUserLogin(req);
        if(!req.body.comentario||req.body.comentarioId) return res.status(400).send('Verifique que el comentario no este vacio.');
        req.body.correoUsuario = user.correo
        await respuesta.insertOne(req.body)
        res.status(200).send('Comentario agregado exitosamente')
    }
    static async deleteRespuesta(req,res){
        const user = await traerUserLogin(req);
        if(!req.body.codigo) return res.status(400).send('Ingrese el codigo del comentario a eliminar.');
        const consulta = await respuesta.findOne({_id: new ObjectId(req.body.codigo),correoUsuario: user.correo})
        if(!consulta) return res.status(400).send('Este comentario no te pertenece, no lo puedes eliminar.');
        await respuesta.deleteOne({_id: new ObjectId(req.body.codigo)})
        res.status(400).send('Comentario eliminado con exito.');
    }
}