import db from '../config/connectMongo.js';
import { traerUserLogin } from '../utils/funcionesGlobales.js';
import { ObjectId } from 'mongodb';

const cursos = db.getInstancia().elegirColeccion('cursos').conectar();
const usuario = db.getInstancia().elegirColeccion('usuarios').conectar();
const calificacion = db.getInstancia().elegirColeccion('calificacion').conectar();

export default class Cursos {
    static async getCursos(req,res){
        const data = await cursos.aggregate([
            {
                $match: {activo: 1}
            },
            {
                $project: {
                    _id: 0,
                    activo: 0,
                    ['calificacion.contador']: 0
                }
            }
        ]).toArray()
        res.status(200).send(data)
    }
    static async infoCurso(req,res){
        const user = await traerUserLogin(req)
        const data = await cursos.aggregate([
            {
                $match: {correo: user.correo, activo: 1}
            },
            {
                $project: {
                    _id: 0,
                    activo: 0
                }
            }
        ]).toArray()
        res.status(200).send(data)
    }
    static async postCurso(req,res){
        const user = await traerUserLogin(req)
        if(user.rol != 1) return res.status(400).send({status: 400,message: 'No se puede registrar un curso a su nombre'})
        req.body.calificacion = {
            contador: 0,
            estrellas: 0
        }
        req.body.correo = user.correo
        req.body.activo = 1
        await usuario.updateOne({_id: new ObjectId(user._id.toString())},{$set: {rol: 2,permisos: {'/usuario':['1.0.0','1.0.1'],'/contenido':['1.0.0','1.0.1','1.0.2','1.0.3','1.0.4']}}})
        await cursos.insertOne(req.body)
        res.status(200).send({status: 200,message: 'Curso registrado exitosamente.'})
    }
    static async deleteCurso(req,res){
        const user = await traerUserLogin(req)
        if(req.body.confirmacion != 'confirmar') return res.status(400).send({status: 400,message: 'Para borrar el curso digite "confirmar"'});
        await cursos.updateOne({correo: user.correo, activo: 1},{$set:{activo: 0}})
        await usuario.updateOne({_id: new ObjectId(user._id.toString())},{$set: {rol: 1,permisos: {'/usuario':['1.0.0'],'/contenido':['1.0.0','1.0.1','1.0.2','1.1.0']}}})
        res.status(200).send({status: 200,message: 'Curso eliminado exitosamente.'})
    }
    static async actualizarCurso(req,res){
        if((req.body.activo)||(req.body.correo)||(req.body.calificacion)) return res.status(400).send({status: 400,message: 'Hay valores que no se pueden modificar en el campo'});
        const user = await traerUserLogin(req);
        await cursos.updateOne({ correo: user.correo, activo: 1 }, { $set: req.body })
        res.status(200).send({status: 200, message: "Curso actualizado con exito"})
    }
    static async postCalificacion(req,res){
        if((!req.body.calificacion)||(req.body.calificacion < 0)||(req.body.calificacion > 5)) return res.status(400).send({status: 400,message: 'Es necesario poner un numero del 1 al 5'});
        const user = await traerUserLogin(req)
        const data = await calificacion.findOne({correoUsuario: user.correo,nombreCurso:req.params.curso})
        if(data) return res.status(400).send({status: 400,message: 'Ya calificaste este curso.'});
        req.body.correoUsuario = user.correo
        req.body.nombreCurso = req.params.curso
        await calificacion.insertOne(req.body)
        const consulta = await cursos.updateOne({nombre: req.params.curso,activo:1},{$inc: {'calificacion.contador': 1, 'calificacion.estrellas':req.body.calificacion}})
        if(!consulta) return res.status(400).send({status: 400, message: 'El curso no existe'})
        return res.status(200).send({status: 200,message: 'Se califico con exito este curso.'});
    }
}