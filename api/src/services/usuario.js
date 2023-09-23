import db from '../config/connectMongo.js';
const usuario = db.getInstancia().elegirColeccion('usuarios').conectar()

export default class Usuarios {
    static async postUsuarios(req,res){
        req.body.activo = 1;
        req.body.role = 1;
        req.body.permisos = {
            "/usuario": ["1.0.0"]
        }
        await usuario.insertOne(req.body);
        res.status(200).send({status: 200, message: "Usuario registrado con exito"});
    }
}