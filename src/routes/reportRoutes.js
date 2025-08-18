import express from 'express';
import { getSalesRange, getSalesFrom, getSalesTo, getTopProductsRange, getTopProductsFrom, getTopProductsTo, getInventoryAlerts } from '../controllers/reportController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// SALES
router.get('/sales/range', getSalesRange);   // requires from & to
router.get('/sales/from', getSalesFrom);     // only from
router.get('/sales/to', getSalesTo);         // only to

// TOP PRODUCTS
router.get('/top-products/range', getTopProductsRange);
router.get('/top-products/from', getTopProductsFrom);
router.get('/top-products/to', getTopProductsTo);

//Inventory Alerts
router.get('/inventory', verifyToken, getInventoryAlerts);

export default router;