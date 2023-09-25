import db from '../config/connectMongo.js';

const cursos = db.getInstancia().elegirColeccion('cursos').conectar();

export default class Cursos {
    static async getCursos(req,res){
        const data = await cursos.findOne({})
        res.status(200).send(data)
    } 
}