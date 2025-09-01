import express from 'express';
import {requestOTP ,verifyOTP} from '../controllers/adminAuthContoller.js';

const router = express.Router();

router.post('/Admin-request-otp', requestOTP);
router.post('/Admin-verify-otp', verifyOTP);

export default router;