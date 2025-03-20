import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios", 
        required: true
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Productos", 
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    fechaAgregado: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Carrito", carritoSchema, "carrito");
