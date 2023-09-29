import db from '../config/connectMongo.js';
import { traerUserLogin } from '../utils/funcionesGlobales.js';

const video = db.getInstancia().elegirColeccion('videos').conectar();
const seccion = db.getInstancia().elegirColeccion('secciones').conectar();
const curso = db.getInstancia().elegirColeccion('cursos').conectar();

export default class Videos {
    static async getVideos(req,res){
        const consulta = await seccion.findOne({nombre: req.params.seccion})
        if(!consulta) return res.status(400).send({status: 400, message: 'La seccion no existe'})
        const data = await video.aggregate([
            {
                $match: {seccionId: consulta._id.toString()}
            },
            {
                $project: {
                    _id: 0,
                    seccionId: 0
                }
            }
        ]).toArray();
        if(data.length === 0) return res.status(400).send({status: 400, message: 'La seccion que buscas no tiene videos agregados aun.'})
        res.status(200).send(data);
    }
    static async getVideoSolo(req,res){
        const consulta = await video.findOne({nombre: req.params.video})
        if(!consulta) return res.status(400).send({status: 400, message: 'El video que buscas no existe'})
        const data = await video.aggregate([
            {
                $match: {nombre: req.params.video}
            },
            {
                $project: {
                    _id: 0,
                    "codigo": "$_id",
                    "nombre": "$nombre",
                    "link": "$urlVideo"
                }
            }
        ]).toArray();
        res.status(200).send(data);
    }
    static async postVideo(req,res){
        const user = await traerUserLogin(req)
        const consulta = await curso.findOne({correo: user.correo,activo:1});
        const consulta1 = await seccion.findOne({cursoId: consulta._id.toString(),nombre: req.params.seccion})
        if((consulta.nombre != req.params.curso)||(!consulta1)) return res.status(400).send({status: 400,message: 'No se puede guardar un video.'});
        req.body.seccionId = consulta1._id.toString()
        await video.insertOne(req.body)
        res.status(200).send({status: 200,message: 'Se agrego un nuevo video a la seccion.'})
    }
    static async deleteVideo(req,res){
        const user = await traerUserLogin(req)
        const consulta = await curso.findOne({correo: user.correo,activo:1,nombre:req.params.curso});
        const consulta1 = await seccion.findOne({cursoId: consulta._id.toString(),nombre: req.params.seccion})
        if((consulta.nombre != req.params.curso)||((consulta1.nombre != req.params.seccion))) return res.status(400).send({status: 400,message: 'No se puede eliminar un video.'});
        if(!req.body.nombre) return res.status(400).send({status: 400,message: 'Para eliminar una seccion debe primero colocar el nombre de esta.'});
        const data = await video.findOne({nombre: req.body.nombre,seccionId: consulta1._id.toString()});
        if(!data) return res.status(400).send({status: 400, message: 'El video que buscas aun no existe.'})
        await video.deleteOne({nombre: req.body.nombre,seccionId: consulta1._id.toString()})
        res.status(200).send({status: 200,message: 'Se elimino un video de la seccion.'})
    }
}