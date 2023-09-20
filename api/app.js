import express from 'express';
import { loadEnv } from 'vite';
import cors from 'cors';

const env = loadEnv('development', process.cwd(), "VITE");
const app = express();

app.use(cors());
app.use(express.json());

const config = {
    port: env.VITE_PORT_BACKEND,
    hostname: env.VITE_HOSTNAME
}

app.listen(config,()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})