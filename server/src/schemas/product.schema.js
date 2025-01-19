import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },  
  description: { type: String, required: true },  
  price: { type: Number, required: true },  
  category: { type: String, default: 'phone-straps' },  
  stock: { type: Number, default: 0 },  
  imagesUrl: { 
    type: mongoose.Schema.Types.Mixed,  
    required: true  
  }
}, { timestamps: true });

export default productSchema;
