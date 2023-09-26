import db from '../config/connectMongo.js';

const seccion = db.getInstancia().elegirColeccion('secciones').conectar();
const curso = db.getInstancia().elegirColeccion('cursos').conectar();

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
}