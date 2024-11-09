
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, default: 'phone-straps' },
  stock: { type: Number, default: 0 }, 
  imageUrl: { type: String, default: '' }, 
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
