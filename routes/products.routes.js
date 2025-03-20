import {Router} from 'express';
import { authRequiered } from '../middlewares/validateToken.js';
import { empleadOnly } from '../middlewares/empleadoOnly.js';
import { validateSchema   } from '../middlewares/validator.middleware.js';
import { productSchema } from '../schemas/products.schema.js'
import {
    getProducts,
    getProduct,
    createProduct,
    getProductsByCategory,
    updateProduct,
    deleteProduct
} from '../controllers/products.controller.js'

const router=Router();

//Consulta todos los productos
router.get('/products',getProducts);  
//Consulta un producto especifico
router.get('/product/:id',getProduct); 
//Porductos por categoria
router.get('/categoria/:categoria', getProductsByCategory);
//Crear un producto
router.post('/productsCre',authRequiered,empleadOnly,validateSchema(productSchema),createProduct);  
//Elimina un producto especifico
router.delete('/productsDel/:id',authRequiered,empleadOnly,deleteProduct);  
//Actualiza un producto
router.put('/productsUpd/:id',authRequiered,empleadOnly,updateProduct);   



export default router; 