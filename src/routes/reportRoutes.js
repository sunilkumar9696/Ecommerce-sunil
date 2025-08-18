import express from 'express';
import { getSalesReport, getTopProducts, getInventoryAlerts } from '../controllers/reportController.js';
import {verifyToken} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/sales',verifyToken, getSalesReport);
router.get('/products/top',verifyToken, getTopProducts);
router.get('/inventory',verifyToken, getInventoryAlerts);

export default router;