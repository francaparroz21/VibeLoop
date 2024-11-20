import express from 'express';
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct, createManyProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);

router.post('/', async (req, res) => {
    if (Array.isArray(req.body)) {
        await createManyProducts(req, res);
    } else {
        await createProduct(req, res);
    }
});

router.get('/:id', getProductById);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;
