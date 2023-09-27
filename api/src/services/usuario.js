import db from '../config/connectMongo.js';
import { traerUserLogin } from '../utils/funcionesGlobales.js';
import { ObjectId } from 'mongodb';
const usuario = db.getInstancia().elegirColeccion('usuarios').conectar()

export default class Usuarios {
    static async postUsuarios(req,res){
        req.body.activo = 1;
        req.body.rol = 1;
        req.body.permisos = {
            "/usuario": ["1.0.0"]
        }
        await usuario.insertOne(req.body);
        res.status(200).send({status: 200, message: "Usuario registrado con exito"});
    }
    static async getInformacion(req,res){
        const user = await traerUserLogin(req);
        const data = await usuario.aggregate([
            {
                $match: {_id: new ObjectId(user._id.toString())}
            },
            {
                $project: {
                    _id: 0,
                    rol: 0,
                    activo: 0,
                    permisos: 0
                }
            }
        ]).toArray();
        res.status(200).send(data)
    }
}