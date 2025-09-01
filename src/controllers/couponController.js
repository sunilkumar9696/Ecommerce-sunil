import Coupon from '../models/Coupon.js';

// GET all coupons with pagination and search
export const getCoupons = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const filter = {
      ...(search && { code: { $regex: search, $options: 'i' } })
    };

    const coupons = await Coupon.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Coupon.countDocuments(filter);

    res.status(200).json({ total, page: Number(page), limit: Number(limit), coupons });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single coupon by ID
export const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE coupon
export const createCoupon = async (req, res) => {
  try {
    const { code, discountType, discountValue, startDate, endDate, minOrderAmount, status } = req.body;

    // Check if coupon code already exists
    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) return res.status(400).json({ message: 'Coupon code already exists' });

    const coupon = new Coupon({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      startDate,
      endDate,
      minOrderAmount,
      status,
      createdBy: req.user._id // from auth middleware
    });

    const saved = await coupon.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE coupon
export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

    const { code, discountType, discountValue, startDate, endDate, minOrderAmount, status } = req.body;

    if (code) coupon.code = code.toUpperCase();
    if (discountType) coupon.discountType = discountType;
    if (discountValue) coupon.discountValue = discountValue;
    if (startDate) coupon.startDate = startDate;
    if (endDate) coupon.endDate = endDate;
    if (minOrderAmount !== undefined) coupon.minOrderAmount = minOrderAmount;
    if (status) coupon.status = status;

    const updated = await coupon.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE coupon
export const deleteCoupon = async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Coupon not found' });
    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
