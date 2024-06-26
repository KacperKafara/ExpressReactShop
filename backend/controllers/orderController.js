import { getOrders, getOrderById, getOrdersByUsername, getOrdersByStatus, addOrder, changeStatus } from '../services/orderService.js'
import express from 'express';

const router = express.Router();

router.get('/', getOrders);
router.get('/id/:id', getOrderById);
router.get('/username/:username', getOrdersByUsername);
router.get('/status/:status', getOrdersByStatus);
router.post('/', addOrder);
router.patch('/id/:id', changeStatus);

export default router;