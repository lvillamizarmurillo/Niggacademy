import db from '../config/connectMongo.js';
import { traerUserLogin } from '../utils/funcionesGlobales.js';
import { ObjectId } from 'mongodb';

const cursos = db.getInstancia().elegirColeccion('cursos').conectar();
const usuario = db.getInstancia().elegirColeccion('usuarios').conectar();

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
                    activo: 0,
                    ['calificacion.contador']: 0
                }
            }
        ]).toArray()
        res.status(200).send(data)
    }
    static async postCurso(req,res){
        const user = await traerUserLogin(req)
        if(user.rol != 1) return res.status(400).send('No se puede registrar un curso a su nombre')
        req.body.calificacion = {
            contador: 0,
            estrellas: 0
        }
        req.correo = user.correo
        req.body.activo = 1
        await usuario.updateOne({_id: new ObjectId(user._id.toString())},{$set: {rol: 2,permisos: {'/usuario':['1.0.0','1.0.1'],'/contenido':['1.0.0','1.0.1','1.0.2','1.0.3','1.0.4']}}})
        await cursos.insertOne(req.body)
        res.status(200).send('Curso registrado exitosamente.')
    }
    static async deleteCurso(req,res){
        const user = await traerUserLogin(req)
        if(req.body.confirmacion != 'confirmar') return res.status(400).send('Para borrar el curso digite "confirmar"');
        await cursos.updateOne({correo: user.correo},{$set:{activo: 0}})
        await usuario.updateOne({_id: new ObjectId(user._id.toString())},{$set: {rol: 1,permisos: {'/usuario':['1.0.0'],'/contenido':['1.0.0','1.0.1','1.0.2']}}})
        res.status(200).send('Curso eliminado exitosamente.')
    }
    static async actualizarCurso(req,res){
        if((req.body.activo)||(req.body.correo)||(req.body.calificacion)) return res.status(400).send('Hay valores que no se pueden modificar en el campo');
        const user = await traerUserLogin(req);
        await cursos.updateOne({ correo: user.correo }, { $set: req.body })
        res.status(200).send({status: 200, message: "Curso actualizado con exito"})
    }
}