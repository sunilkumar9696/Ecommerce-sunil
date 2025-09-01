import express from 'express';
import uploadProduct from '../middlewares/uploadProduct.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', uploadProduct.any(), createProduct);
router.put('/:id', uploadProduct.any(), updateProduct);
router.delete('/:id', deleteProduct);

export default router;