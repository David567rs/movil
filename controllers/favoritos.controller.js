import Favorito from "../models/favoritos.model.js";
import Carrito from "../models/carrito.model.js";
import User from "../models/user.model.js";
import Producto from "../models/poducts.model.js";

// Agregar producto a favoritos
export const agregarFavorito = async (req, res) => {
    const { email, codigoProducto } = req.body;

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const producto = await Producto.findOne({ codigo: codigoProducto });
        if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

        // Verificar si el producto ya está en favoritos
        const favoritoExistente = await Favorito.findOne({ usuario: usuario._id, producto: producto._id });
        if (favoritoExistente) {
            return res.status(200).json({ message: "El producto ya está en favoritos" });
        }

        // Guardar favorito
        const nuevoFavorito = new Favorito({ usuario: usuario._id, producto: producto._id });
        await nuevoFavorito.save();

        res.json({ message: "Producto agregado a favoritos" });
    } catch (error) {
        console.error("Error al agregar a favoritos:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};

// Eliminar producto de favoritos
export const eliminarFavorito = async (req, res) => {
    const { email, codigoProducto } = req.body;

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const producto = await Producto.findOne({ codigo: codigoProducto });
        if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

        const favorito = await Favorito.findOneAndDelete({ usuario: usuario._id, producto: producto._id });
        if (!favorito) return res.status(404).json({ message: "Producto no encontrado en favoritos" });

        res.json({ message: "Producto eliminado de favoritos" });
    } catch (error) {
        console.error("Error al eliminar de favoritos:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};

// Obtener lista de favoritos de un usuario (con detalles de productos)
export const obtenerFavoritos = async (req, res) => {
    const { email } = req.params;

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const favoritos = await Favorito.find({ usuario: usuario._id }).populate("producto");
        if (favoritos.length === 0) return res.status(404).json({ message: "No hay productos en favoritos" });
        
        res.json(favoritos);
    } catch (error) {
        console.error("Error al obtener favoritos:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};


//Para carrito
// Agregar producto al carrito
export const agregarCarrito = async (req, res) => {
    const { email, codigoProducto, cantidad } = req.body;

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const producto = await Producto.findOne({ codigo: codigoProducto });
        if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

        if (cantidad <= 0) return res.status(400).json({ message: "Cantidad debe ser mayor a 0" });

        const itemExistente = await Carrito.findOne({ usuario: usuario._id, producto: producto._id });

        if (itemExistente) {
            itemExistente.cantidad += cantidad;
            await itemExistente.save();
            return res.json({ message: "Cantidad actualizada en el carrito" });
        }

        // Guardar nuevo producto en el carrito
        const nuevoCarrito = new Carrito({ usuario: usuario._id, producto: producto._id, cantidad });
        await nuevoCarrito.save();

        res.json({ message: "Producto agregado al carrito" });
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};

// Eliminar producto del carrito
export const eliminarCarrito = async (req, res) => {
    const { email, codigoProducto } = req.body;

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const producto = await Producto.findOne({ codigo: codigoProducto });
        if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

        const item = await Carrito.findOneAndDelete({ usuario: usuario._id, producto: producto._id });
        if (!item) return res.status(404).json({ message: "Producto no encontrado en el carrito" });

        res.json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        console.error("Error al eliminar del carrito:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};

// Obtener productos en el carrito de un usuario
export const obtenerCarrito = async (req, res) => {
    const { email } = req.params;

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const carrito = await Carrito.find({ usuario: usuario._id }).populate("producto");
        if (carrito.length === 0) return res.status(404).json({ message: "No hay productos en el carrito" });

        res.json(carrito);
    } catch (error) {
        console.error("Error al obtener carrito:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};
