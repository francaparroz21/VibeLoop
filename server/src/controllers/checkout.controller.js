import Order from '../models/order.model.js';
import Product from '../models/product.model.js';

export const createOrder = async (req, res) => {
  const { cart, totalAmount, shippingDetails, paymentMethod, userId } = req.body;

  try {
    const products = await Product.find({ '_id': { $in: cart.map(item => item.productId) } });

    for (const item of cart) {
      const product = products.find(p => p._id.toString() === item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `El producto ${product.title} no tiene suficiente stock` });
      }
    }

    const newOrder = new Order({
      user: userId,  
      cart,
      totalAmount,
      shippingDetails,
      paymentMethod,
      status: 'pending', 
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Orden creada con éxito',
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la orden' });
  }
};
