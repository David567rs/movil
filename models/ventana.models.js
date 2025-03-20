import mongoose from "mongoose";

const ventanaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    temp: {
        type: String,
        required: true
    },
    estVentana: {
        type: String,
        required: true
    }
});

export default mongoose.model("iot", ventanaSchema);
