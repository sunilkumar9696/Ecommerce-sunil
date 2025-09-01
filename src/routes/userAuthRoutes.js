// routes/authRoutes.js
import express from 'express';
import { requestOTP, verifyOTP, updateProfile } from '../controllers/authController.js';
import {verifyToken} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);
router.put('/update-Profile' ,verifyToken, updateProfile);

export default router;