import express from 'express';
import { getAllStatus } from '../services/statusService.js';

const router = express.Router();

router.get('/', getAllStatus);

export default router;
