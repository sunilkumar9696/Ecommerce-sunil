import crypto from 'crypto';
import razorpayInstance from '../config/razorPay.js';
import Payment from '../models/Payment.js';
import User from '../models/User.js';

// ✅ Initiate Payment
export const initiatePayment = async (req, res) => {
  try {
    const { amount, userId } = req.body;

    if (!amount || !userId) {
      return res.status(400).json({ message: 'Amount and User ID are required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const options = {
      amount: amount * 100, // Razorpay accepts amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpayInstance.orders.create(options);

    const payment = new Payment({
      userId,
      orderId: order.id,
      amount,
      currency: order.currency,
      status: 'pending',
      receipt: order.receipt
    });
    await payment.save();

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment details' });
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (expectedSign === razorpay_signature) {
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { paymentId: razorpay_payment_id, status: 'success' },
        { new: true }
      );

      return res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: 'failed' }
      );
      return res.status(400).json({ success: false, message: 'Invalid signature, payment failed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Payment History
export const getPaymentHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const payments = await Payment.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Webhook (Payment confirmation from Razorpay)
export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest === req.headers['x-razorpay-signature']) {
      const event = req.body.event;

      if (event === 'payment.captured') {
        const { order_id, id } = req.body.payload.payment.entity;

        await Payment.findOneAndUpdate(
          { orderId: order_id },
          { paymentId: id, status: 'success' }
        );
      }
      return res.status(200).json({ status: 'ok' });
    } else {
      return res.status(400).json({ status: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
