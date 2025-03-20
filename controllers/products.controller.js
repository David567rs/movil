import product from "../models/poducts.model.js";  
import mongoose from "mongoose";

//Trae todos los productos
export const getProducts = async (req, res)=>{
    const productos = await product.find();
    res.json(productos);
}

//Trae un producto especifico
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "ID de producto inválido" });
        }

        const producto = await product.findById(id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error });
    }
};

//Crea un producto
export const createProduct = async (req, res) => {
    try {
        const { nombre, descripcion, categoria, marca, precio, stock, modelo, estado, imagenes, codigo, dimensiones, date } = req.body;

        const newProduct = new product({ nombre, descripcion, categoria, marca, precio, stock, modelo, estado, imagenes, codigo, dimensiones, date });

        const saveProduct = await newProduct.save();
        res.json(saveProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error });
    }
};


//Actualiza un producto
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        // Validar que el ID sea válido
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "ID de producto inválido" });
        }

        // Actualizar solo los campos proporcionados
        const updatedProduct = await product.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto actualizado exitosamente", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error });
    }
};

//Elimina un producto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "ID de producto inválido" });
        }

        const deletedProduct = await product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado exitosamente", deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error });
    }
};

//Trea productos por categoria
export const getProductsByCategory = async (req, res) => {
    try {
        const { categoria } = req.params;

        // Buscar productos con la categoria
        const productos = await product.find({ categoria });

        if (!productos.length) {
            return res.status(404).json({ message: "No se encontraron productos en esta categoría" });
        }

        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos por categoría", error });
    }
};