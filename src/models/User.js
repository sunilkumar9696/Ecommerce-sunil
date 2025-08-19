// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  mobile: { type: String, unique: true, required: true },
  wishlist: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      variantId: { type: mongoose.Schema.Types.ObjectId },
      addedAt: { type: Date, default: Date.now }
    }
  ],
  otp: String,
  otpExpires: Date
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;