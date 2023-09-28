import db from '../config/connectMongo.js';

const video = db.getInstancia().elegirColeccion('videos').conectar();
const seccion = db.getInstancia().elegirColeccion('secciones').conectar();
const curso = db.getInstancia().elegirColeccion('cursos').conectar();

export default class Videos {
    static async getVideos(req,res){
        const consulta = await seccion.findOne({nombre: req.params.seccion})
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
        res.status(200).send(data);
    }
    static async getVideoSolo(req,res){
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
        if((!consulta)||(consulta.nombre != req.paramas.curso)) return res.status(400).send({status: 400,message: 'No se puede guardar una seccion.'});
        const consulta1 = await seccion.findOne({nombre: req.params.seccion})
        req.body.seccionId = consulta1._id.toString()
        await video.insertOne(req.body)
        res.status(200).send({status: 200,message: 'Se agrego un nuevo video a la seccion.'})
    }
    static async deleteVideo(req,res){
        const user = await traerUserLogin(req)
        const consulta = await curso.findOne({correo: user.correo,activo:1});
        if((!consulta)||(consulta.nombre != req.paramas.curso)) return res.status(400).send({status: 400,message: 'No se puede guardar una seccion.'});
        if(!req.body.nombre) return res.status(400).send({status: 400,message: 'Para eliminar una seccion debe primero colocar el nombre de esta.'});
        await video.deleteOne({nombre: req.body.nombre})
        res.status(200).send({status: 200,message: 'Se elimino un video de la seccion.'})
    }
}