import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://somostoolbox:rgSM5HSSvVywo749@cluster0.00b7q.mongodb.net/pruebatoolbox?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Conectado');
    } catch (error) {
        console.error('Error con la db:', error.message);
    }
};