import express from 'express';
import { loadEnv } from 'vite';
import cors from 'cors';
import rateLimit from './src/config/rateLimit.js';
import routerDinamico from './src/routes/index.js';

const env = loadEnv('development', process.cwd(), 'VITE');
const app = express()
const corsOptions = {
    origin: 'http://127.16.15.14:5073', // Reemplaza con el dominio de tu aplicación frontend
};
const config = {
    hostname: env.VITE_HOSTNAME,
    port: env.VITE_PORT_BACKEND
}

app
    .use(rateLimit)

    .use(cors(corsOptions))

    .use(express.json())

    .use(async(req,res,next)=>{
        try {
            app.use('/niggacademy', await routerDinamico(req.header('Accept-version')))
        } catch (error) {
            res.status(400).send({status: 400,message: 'Ingrese en los headers la version a utilizar para el api'})
        }
        next()
    })
    .listen(config, ()=>{
        console.log(`http://${config.hostname}:${config.port}`);
    })