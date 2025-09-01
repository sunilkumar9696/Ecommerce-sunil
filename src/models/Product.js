import mongoose from 'mongoose';

const productDetails = new mongoose.Schema({
  size: [String],
  color: [String],
  stock: Number,
  price: Number,
  material: [String],
  pattern: String,
  occasion: String,
  neckline: String,
  closure: String,
  packSize: String,
  sleeveStyle: String,
  careInstructions: String,
  packCotains: String
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  discount: { type: Number }, // percentage
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true }
    }
  ],
   category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', // Reference Category model
    required: true 
  },
  variants: [productDetails],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
