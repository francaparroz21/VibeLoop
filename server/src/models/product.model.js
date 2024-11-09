import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
