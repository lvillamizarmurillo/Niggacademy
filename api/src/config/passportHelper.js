import passport from "passport";
import { verificarToken } from '../middlewares/jwt.js';
import { Strategy as BearerStrategy } from "passport-http-bearer";

passport.use(new BearerStrategy(
    { passReqToCallback: true },
    async function (req,token,done){
        const usuario = await verificarToken(req,token);
        if (!usuario) {return done(null, false)}else if(usuario.activo == 0){return done(null, false)}
        done(null,usuario)
    }
))
export default passport;