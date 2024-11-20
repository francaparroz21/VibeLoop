import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String,required:true },  
    stock: { type: Number, required: true, min: 0 }, 
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
