import { Router } from "express";
import { agregarFavorito, eliminarFavorito, obtenerFavoritos,
    agregarCarrito, eliminarCarrito, obtenerCarrito
 } from "../controllers/favoritos.controller.js";
import { authRequiered } from '../middlewares/validateToken.js';

const router = Router();

//Para Favoritos
router.post("/agregarFav",authRequiered, agregarFavorito);
router.delete("/eliminarFav", authRequiered, eliminarFavorito);
router.get("/userFav/:email", authRequiered, obtenerFavoritos);

//Para carrito
router.post("/agregarCar", authRequiered, agregarCarrito);
router.delete("/eliminarCar", authRequiered, eliminarCarrito);
router.get("/userCar/:email", authRequiered, obtenerCarrito);

export default router;
