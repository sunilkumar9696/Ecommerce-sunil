import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  thumbnail: {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  stock: { type: Number, default: 0 },
  tagId: { type: String },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Others'],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;