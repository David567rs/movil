import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    imagenes: {
        img1: { type: String, required: true },
        img2: { type: String, required: true },
        img3: { type: String, required: true },
        img4: { type: String, required: true }
    },
    codigo: {
        type: String,
        required: true
    },
    dimensiones: {
        ancho: {
            type: Number,
            required: true
        },
        alto: {
            type: Number,
            required: true
        },
        peso: {
            type: Number,
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Productos", productSchema,"productos");