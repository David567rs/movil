import mongoose from "mongoose";

const tycSchema = new mongoose.Schema({
    contenido: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("TerminosyCondiciones", tycSchema, "terminosycondiciones")
