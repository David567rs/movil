import mongoose from "mongoose";

const PgsyRpsSchema = new mongoose.Schema({
    pregunta:{
        type: String,
        required: true
    },
    respuesta:{
        type: String,
        required: true
    },
    estado:{
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Faq", PgsyRpsSchema,"faq");