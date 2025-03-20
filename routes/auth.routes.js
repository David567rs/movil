import {Router} from 'express';
import { register,
        login, 
        logout, 
        profile, 
        verifyToken 
    } from '../controllers/auth.controller.js';
import { authRequiered } from '../middlewares/validateToken.js';
import { validateSchema   } from '../middlewares/validator.middleware.js';
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

const router=Router();

router.post('/register', validateSchema(registerSchema),register);
router.post('/login',validateSchema(loginSchema),login);
router.post('/logout',logout);
router.get('/verify', verifyToken);

router.post('/perfilUsuario', )
router.get('/profile', authRequiered,  profile);

export default router; 