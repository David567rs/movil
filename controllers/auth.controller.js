import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

//Registro
export const register = async (req,res)=>{
    const {name,username,email,pregunta, respuesta,contra,confirmContra,rol}= req.body;
        
    //Busqueda de usuario
    const userFound= await User.findOne({email});
    if(userFound) return res.status(409).json(["El correo ya esta registrado"])

    try {
        //validacion para contraseñas
        if(contra!==confirmContra) return res.status(400).json({message:"Las contraseñas no coinciden"});
        //Encriptar la contraseña
        const has1 = await bcrypt.hash(contra,10);

        const newUser= new User({
            name,
            username,
            email,
            pregunta,
            respuesta,
            contra:has1,
            rol
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({
            id: userSaved._id,
            rol: userSaved.rol,
            nombre: userSaved.name.nombres,
            });
        res.cookie("token",token);

        res.json({
            id: userSaved._id,
            rol: userSaved.rol,
            name: userSaved.name.nombres,
            username: userSaved.username, 
            email: userSaved.email
        });

    } catch (error) {
        console.error("Error al guardar:", error);
        res.status(500).json({ message: "Error al guardar", error });
    }
}

//Actualizacion
export const actualizacion = async (req, res) =>{
    const {name,telefono,direccion,ciudad,username,email,pregunta,respuesta,contra,confirmContra,rol} = req.body
    
    try{
        //validacion para contraseñas
        if(contra!==confirmContra) return res.status(400).json({message:"Las contraseñas no coinciden"});
        //Encriptar la contraseña
        const has1 = await bcrypt.hash(contra,10);

        const newUser= new User({
            name,
            telefono,
            direccion,
            ciudad,
            username,
            email,
            pregunta,
            respuesta,
            contra:has1,
            rol
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({
                                    id: userSaved._id,
                                    rol: userSaved.rol,
                                    nombre: userSaved.name.nombres,
                                    ap: userSaved.name.apellidopaterno,
                                    am: userSaved.name.apellidomaterno
                                    });
        res.cookie("token",token);

        res.json({
            id: userSaved._id,
            rol: userSaved.rol,
            name: userSaved.name,
            username: userSaved.username, 
            email: userSaved.email
        });
    }catch (error) {
        console.error("Error al guardar:", error);
        res.status(500).json({ message: "Error al guardar", error });
    }    
};

//Login
export const login = async (req, res) =>{
    const {email,contra} = req.body;
    try{
        //Si el usuario existe(por email)
        const userFound= await User.findOne({email});
        //
        if(!userFound) return res.status(400).json({message:"Usuario no encontrado"});

        const isMatch= await bcrypt.compare(contra,userFound.contra);

        if(!isMatch) return res.status(400).json({message:"Contraseña incorrecta"});
        
        const token = await createAccessToken({
            id: userFound._id,
            rol: userFound.rol,
            user: userFound.username,
            nombre: userFound.name.nombres,
            ap: userFound.name.apellidopaterno,
            am: userFound.name.apellidomaterno
            });
                 
        res.cookie("token",token);

        res.json({
            id: userFound._id,
            rol: userFound.rol,
            name: userFound.name,
            username: userFound.username, 
            email: userFound.email
        });
    }catch(error){
        console.log("Error al encontrar")
    }
};

//Logout
export const logout = async (req,res)=>{
    res.cookie('token',"",{
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

//Profile
//Ejemplo para consultas en el backend
export const profile = async (req,res)=>{
    //Rescatamos el usuario de validateToken
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message:"Usuario no encontrado"});
 
    return res.json({
        id: userFound._id,
        name: userFound.name,
        username: userFound.username,
        email: userFound.email,
        direccion: userFound.direccion
    })
}

export const verifyToken = async (req,res)=>{
    const {token} = req.cookies ;

    if(!token) return res.status(401).json({message: "No autorizado"});

    jwt.verify(token,TOKEN_SECRET, async (err,user)=>{
        if(err) return res.status(401).json({message: "No autorizado"});

        const userFound = await User.findById(user.id) 
        if(!userFound) return res.status(401).json({message: "No autorizado"});

        return res.json({
            id: userFound._id,
            name: userFound.name,
            username: userFound.username, 
            email: userFound.email,
            rol: userFound.rol,
            direccion: userFound.ciudad
        });
    })
}