import db from '../config/connectMongo.js';
import { traerUserLogin } from '../utils/funcionesGlobales.js';
import { ObjectId } from 'mongodb';
const usuario = db.getInstancia().elegirColeccion('usuarios').conectar()
const favorito = db.getInstancia().elegirColeccion('favoritos').conectar()
const curso = db.getInstancia().elegirColeccion('curso').conectar()

export default class Usuarios {
    static async postUsuarios(req,res){
        req.body.activo = 1;
        req.body.rol = 1;
        req.body.permisos = {
            "/usuario": ["1.0.0"],
            '/contenido':['1.0.0','1.0.1','1.0.2']
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
    static async getFavoritos(req,res){
        const user = await traerUserLogin(req);
        const data = await favorito.aggregate([
            {
                $match: {usuarioId: user._id.toString()}
            },
            {
                $lookup:{
                    from: "cursos",
                    localField: "nombreCurso",
                    foreignField: "nombre",
                    as: "infoCurso"
                }
            },
            {
                $project: {
                    _id: 0,
                    cursoId: 0,
                    usuarioId: 0,
                    ['infoCurso._id']: 0,
                    ['infoCurso.calificacion']: 0,
                    ['infoCurso.correo']: 0,
                    ['infoCurso.activo']: 0
                }
            }
        ]).toArray();
        res.status(200).send(data)
    }
    static async putUsuario(req,res){
        if((req.body.rol)||(req.body.permisos)||(req.body.activo)) return res.status(400).send("No es valido el dato enviado, no se puede cambiar");
        const user = await traerUserLogin(req);
        await usuario.updateOne({ _id: new ObjectId(user._id.toString()) }, { $set: req.body })
        res.status(200).send({status: 200, message: "Usuario actualizado con exito"})
    }
    static async deleteUsuarios(req, res) {
        let user = await traerUserLogin(req);
        if(req.body.confirmacion == "confirmar"){
            await usuario.updateOne({ _id: new ObjectId(user._id.toString()) }, { $set: { activo: 0 } })
            return res.status(200).send({status: 200, message: "Usuario eliminado con exito"});
        }else{
            return res.status(400).send({status: 400, message: "Para eliminar la cuenta necesita colocar confirmacion: confirmar"})
        }
    }
    static async postFavorito(req,res){
        const user = await traerUserLogin(req);
        const consulta = curso.findOne({nombre: req.params.curso});
        req.body.cursoId = consulta._id.toString();
        req.body.usuarioId = user._id.toString();
        req.body.nombreCurso = consulta.nombre
        await favorito.insertOne(req.body)
        res.status(200).send('Se guardo en favoritos exitosamente')
    }
    static async deleteFavoritos(req,res){
        if(!req.body.nombre) return res.status(400).send('Agregue el nombre del curso a eliminar')
        const user = await traerUserLogin(req);
        const consulta = await favorito.findOne({userId: user._id.toString(),nombreCurso: req.body.nombre})
        if(!consulta) return res.status(400).send('La consulta no es valida, revise el nombre del curso.')
        await favorito.deleteOne({userId: user._id.toString(),nombreCurso: req.body.nombre})
        res.status(200).send('Se elimino este curso de favoritos exitosamente.')
    }
}