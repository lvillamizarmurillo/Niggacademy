export const loginUsuario = (req,res)=>{
    res.status(req.data.sattus).send(req.data);
}