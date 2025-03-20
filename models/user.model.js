import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        nombres: {
            type: String,
            required: true
        },
        apellidopaterno: {
            type: String
        },
        apellidomaterno: {
            type: String
        }
    },
    telefono:{
        type: String
    },
    direccion:{
        type: String,
    },
    ciudad:{
        type: String,
        trim: true
    },
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        trim:true
    },
    pregunta:{
        type: String,
        required: true,
        trim: true
    },
    respuesta:{
        type: String,
        required: true,
        trim: true
    },
    contra:{
        type: String,
        required: true,
        trim: true
    },
    rol:{
        type: Number,
        default: 2
    }
},{
    timestamps:true
});

export default mongoose.model('Usuarios', userSchema,"usuarios");