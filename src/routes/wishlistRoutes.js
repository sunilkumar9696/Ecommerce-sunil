import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishlistController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', addToWishlist);
router.delete('/remove/:productId', removeFromWishlist);
router.get('/', getWishlist);

export default router;
