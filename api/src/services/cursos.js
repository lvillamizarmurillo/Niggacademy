import db from '../config/connectMongo.js';

const cursos = db.getInstancia().elegirColeccion('cursos').conectar();

export default class Cursos {
    static async getCursos(req,res){
        const data = await cursos.aggregate([
            {
                $match: {}
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
}