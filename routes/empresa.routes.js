import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { empresaSchema, faqSchema, teryconSchema, polSchema } from "../schemas/dtsEmp.schema.js";
import { createDatos,
    updateDatos, getDatosEmpresa,
    createPreyRes, getPreyRes,
    updatePreyRes, deletePreyRes,
    createTyC, updateTyC,
    getTyC, deleteTyC,
    createPoliticas, updatePoliticas,
    getPoliticas, deletePoliticas,
    getPryRe, getTyCid,
    getPolid
} from "../controllers/dtsEmp.controller.js";
import { authRequiered } from "../middlewares/validateToken.js";
import {adminOnly} from '../middlewares/adminOnly.js';
  
const router=Router();

//Ruta para llamar a la funcion que añade los datos de la empresa
router.post('/dts',authRequiered,adminOnly,validateSchema(empresaSchema),createDatos);
//Ruta para funcion de actualizar
router.put('/actdts',authRequiered,adminOnly,updateDatos);
//Ruta para trar datos
router.get('/getDatos',getDatosEmpresa);

//Rutas Preguntas y respuestas
//Ruta para crear preguntas y rspuestas
router.post('/crtPreyRes',authRequiered,adminOnly,validateSchema(faqSchema),createPreyRes);
//Ruta para taraer preguntas y rspuestas
router.get('/gtPreyRes',getPreyRes);
//Ruta para trar por id
router.get('/gtPryRe/:id',getPryRe);
//Ruta para actualizar preguntas y rspuestas
router.put('/uptPreyRes/:id',authRequiered,adminOnly,updatePreyRes);
//Ruta para eliminar preguntas y respuestas
router.delete('/delPreyRes/:id',authRequiered,adminOnly,deletePreyRes);

//Terminos y Condiciones
//crea
router.post('/crtTyC',authRequiered,adminOnly,validateSchema(teryconSchema),createTyC);
//Actualiza
router.put('/uptTyC/:id',authRequiered,adminOnly,updateTyC);
//Traer por id
router.get('/gtTyC/:id',getTyCid);
//Traer
router.get('/gtTyCs',getTyC);
//Elimina
router.delete('/dltTyC/:id',authRequiered,adminOnly,deleteTyC);

//Politicas
//Crear 
router.post('/crtPoliticas',authRequiered,adminOnly, validateSchema(polSchema),createPoliticas);
//Actualiza
router.put('/uptPoliticas/:id',authRequiered,adminOnly,updatePoliticas);
//Trae por id
router.get('/gtPol/:id',getPolid);
//Traer
router.get('/gtPoliticas',getPoliticas);
//Elimina
router.delete('/dltPoliticas/:id',authRequiered,adminOnly,deletePoliticas);

export default router;