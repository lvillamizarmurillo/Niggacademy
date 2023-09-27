import db from '../config/connectMongo.js';

const video = db.getInstancia().elegirColeccion('videos').conectar();
const seccion = db.getInstancia().elegirColeccion('secciones').conectar();

export default class Videos {
    static async getVideo(req,res){
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
}