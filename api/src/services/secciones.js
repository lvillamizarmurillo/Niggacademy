import db from '../config/connectMongo.js';
import { traerUserLogin } from '../utils/funcionesGlobales.js';

const seccion = db.getInstancia().elegirColeccion('secciones').conectar();
const curso = db.getInstancia().elegirColeccion('cursos').conectar();
const video = db.getInstancia().elegirColeccion('videos').conectar();

export default class Secciones {
    static async getSeccion(req,res){
        const consulta = await curso.findOne({nombre: req.params.curso});
        const data = await seccion.aggregate([
            {
                $match: {cursoId: consulta._id.toString()}
            },
            {
                $project: {
                    _id: 0,
                    cursoId: 0
                }
            }
        ]).toArray();
        res.status(200).send(data)
    }
    static async deleteSeccion(req,res){
        const user = await traerUserLogin(req)
        if(!req.body.nombre) return res.status(400).send('Digite el nombre de la seccion a eliminar.');
        await curso.findOne({correo: user.correo,activo: 1})
        const consulta = await seccion.findOne({cursoId: curso._id.toString(),nombre: req.body.nombre})
        if(!consulta) return res.status(400).send('Esta seccion o no existe o no te pertenece, revise bien el nombre.')
        await video.deleteMany({seccionId: consulta._id.toString()})
        await seccion.deleteOne({cursoId: curso._id.toString(),nombre: req.body.nombre})
        res.status(200).send('Seccion eliminada exitosamente.')
    }
    static async postSeccion(req,res){
        const user = await traerUserLogin(req)
        const consulta = await curso.findOne({correo: user.correo,activo:1});
        if((!consulta)||(consulta.nombre != req.paramas.curso)) return res.status(400).send('No se puede guardar una seccion.');
        req.body.cursoId = consulta._id.toString()
        await seccion.insertOne(req.body)
        res.status(200).send('Se agrego una seccion nueva al curso.')
    }
    static async deleteVideo(req,res){
        const user = await traerUserLogin(req)
        const consulta = await curso.findOne({correo: user.correo,activo:1});
        if((!consulta)||(consulta.nombre != req.paramas.curso)) return res.status(400).send('No se puede guardar una seccion.');
        if(!req.body.nombre) return res.status(400).send('Para eliminar una seccion debe primero colocar el nombre de esta.');
        await seccion.deleteOne({nombre: req.body.nombre})
        res.status(200).send('Se elimino una seccion al curso.')
    }
}