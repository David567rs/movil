import mongoose from "mongoose";

const favoritosSchema = new mongoose.Schema({
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
    fechaAgregado: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Favoritos", favoritosSchema,"favoritos");
