import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js ';

export const authRequiered = (req,res, next)=>{
    const {token} = req.cookies;

    //Verifica si existe un token 
    if(!token) 
        return res.status(401).json({message: "No hay token autorizado"});
        //Verifica el token
        jwt.verify(token, TOKEN_SECRET, (err,user)=>{
            if(err) return res.status(403).json({message: "Token invalido"})
            
            req.user = user
        })
    next();
}
