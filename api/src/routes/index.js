import { Router } from "express";
import { readdirSync } from 'fs'
import path from "path";
import os from 'os';

const router = Router();
let PATH_ROUTERS;
const sistemaOp = os.platform();

const nombreLimpio = (archivoNombre)=>{
    const archivo = archivoNombre.split('.').shift()
    return archivo
}

const routerDinamico = async(version)=>{
    if(sistemaOp == 'win32') PATH_ROUTERS = path.dirname(new URL(import.meta.url).pathname).replace(/^\/(\w\:)/, '$1');
    else PATH_ROUTERS = path.dirname(new URL(import.meta.url).pathname)
    PATH_ROUTERS += `/V${(version.split('.'))[0]}`
    const archivos = readdirSync(PATH_ROUTERS)
    const promesasImportantes = archivos.map(async(nombreArchivo)=>{
        const limpioNombre = nombreLimpio(nombreArchivo);
        if(limpioNombre != 'index'){
            try {
                const moduloRouter = await import(`./V${(version.split('.'))[0]}/${nombreArchivo}`)
                if(moduloRouter.router){
                    router.use(`/${limpioNombre}`,moduloRouter.router)
                }
            } catch (error) {
                console.log({status:400,message: 'Error al cargar el modulo'+error})
            }
        }
    })
    await Promise.all(promesasImportantes)
    return router
}

export default routerDinamico;