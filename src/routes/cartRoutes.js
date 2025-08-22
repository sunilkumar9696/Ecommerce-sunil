import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem
} from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', addToCart);
router.get('/', getCart);
router.put('/update/:itemId', updateCartItem);
router.delete('/remove/:itemId', removeCartItem);

export default router;