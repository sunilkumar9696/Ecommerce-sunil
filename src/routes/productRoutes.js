import express from 'express';
import upload from '../middlewares/upload.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', verifyToken, getProducts);
router.get('/:id', verifyToken, getProductById);
router.post('/', upload.any(), createProduct);
router.put('/:id', upload.any(), verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;