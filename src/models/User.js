// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, unique: true},
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  mobile: { type: String, unique: true, required: true },
  wishlist: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      variantId: { type: mongoose.Schema.Types.ObjectId },
      addedAt: { type: Date, default: Date.now }
    }
  ],
  wallet: {
    type: Number,
    default: 0 // Wallet starts with 0 balance
  },
  otp: String,
  otpExpires: Date
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;