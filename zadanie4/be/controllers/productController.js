import express from 'express';
import { getAllProducts, getProductById, addProduct, updateProduct } from '../services/productService.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.patch('/:id', updateProduct);

export default router;