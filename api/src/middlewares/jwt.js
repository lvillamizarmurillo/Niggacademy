import { loadEnv } from 'vite';
import { jwtVerify, SignJWT } from 'jose';
import { ObjectId } from 'mongodb';
import db from '../config/connectMongo.js';

const env = loadEnv('development', process.cwd(), 'JWT');
const usuario = await db.getInstancia().elegirColeccion('usuarios').conectar();
const crearToken = async(req,res,next)=>{
    if(Object.keys(req.body) === 0) return res.status(401).send('Datos no enviados')
    const encoder = new TextEncoder();
    const result = await usuario.findOne({correo: req.body.email, password: req.body.password})
    if(!result) return res.status(401).send({status:401,message:'Usuario no encontrado'})
    const id = result._id.toString();
    const jwtEncriptado = await new SignJWT({id: id})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(env.JWT));
    req.data = {status:200,message:jwtEncriptado};
    next()
}
const verificarToken = async(req,token)=>{
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(env.JWT)
        )
        const baseQuitada = req.baseUrl.slice(12)
        let result = await usuario.findOne({
            _id: new ObjectId(jwtData.payload.id),
            [`permisos.${baseQuitada}`]: `${req.headers['accept-version']}`
        })
        return result
    } catch (error) {
        return false;
    }
}

export {
    crearToken,
    verificarToken
}