import mongoose from "mongoose";

const politicasSchema = new mongoose.Schema({
    contenido: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Politicas", politicasSchema, "politicas")