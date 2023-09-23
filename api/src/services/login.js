export const loginUsuario = (req,res)=>{
    res.status(req.data.status).send(req.data);
}