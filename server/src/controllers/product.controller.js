import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createManyProducts = async (req, res) => {
  const products = req.body;

  try {
    const newProducts = await Product.insertMany(products);
    res.status(201).json(newProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  console.log("Incoming request body:", req.body); 

  const { title, description, price, stock, imagesUrl } = req.body;

  if (!title || !description || !price || !stock || !imagesUrl) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const product = new Product({ title, description, price, stock, imagesUrl });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(400).json({ message: error.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
