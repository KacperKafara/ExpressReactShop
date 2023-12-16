import express from 'express';
import { getAllCategories } from '../services/categoryService.js';

const router = express.Router();

router.get('/', getAllCategories);

export default router;