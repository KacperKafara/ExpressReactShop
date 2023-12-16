import { getOrders, getOrderById, getOrdersByUsername } from '../services/orderService.js'
import express from 'express';

const router = express.Router();

router.get('/', getOrders);
router.get('/id/:id', getOrderById);
router.get('/username/:username', getOrdersByUsername);

export default router;