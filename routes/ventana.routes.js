import {Router} from 'express';
import { postVentana,getVentana } from '../controllers/ventana.controller.js';
postVentana

const router=Router();

router.post('/pventana',postVentana);
router.post('/gventana/:codigo',getVentana);

// router.get('/prueba',prueba);


export default router;