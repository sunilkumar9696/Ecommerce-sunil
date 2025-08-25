import express from 'express';
import {
  initiatePayment,
  verifyPayment,
  getPaymentHistory,
  razorpayWebhook
} from '../controllers/paymentController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/initiate', verifyToken, initiatePayment);
router.post('/verify', verifyToken, verifyPayment);
router.get('/history/:userId', verifyToken, getPaymentHistory);
router.post('/webhook', verifyToken, express.json({ type: '*/*' }), razorpayWebhook);

export default router;