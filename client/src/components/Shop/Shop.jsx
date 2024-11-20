import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { Link } from 'react-router-dom';

const Shop = () => {
    const { products, loading, addToCartByQuantity, removeProductFromCart, cart } = useContext(ProductContext);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        // Al cargar el componente, establece las cantidades según el carrito
        const initialQuantities = {};
        cart.forEach((item) => {
            initialQuantities[item._id] = item.quantity; // Asume que cada elemento del carrito tiene una propiedad `quantity`
        });
        setQuantities(initialQuantities);
    }, [cart]); // Ejecutar cada vez que cambie el carrito

    if (loading) return <p className="text-center">Cargando productos...</p>;

    const handleQuantityChange = (productId, action) => {
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[productId] || 1;
            if (action === 'increment') {
                return { ...prevQuantities, [productId]: currentQuantity + 1 };
            } else if (action === 'decrement' && currentQuantity > 1) {
                return { ...prevQuantities, [productId]: currentQuantity - 1 };
            }
            return prevQuantities;
        });
    };

    return (
        <div className="container mx-auto py-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => {
                    const isInCart = cart.some(item => item._id === product._id);
                    const quantity = quantities[product._id] || 1;

                    return (
                        <div
                            key={product._id}
                            className="bg-white rounded-lg py-16 shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={product.imageUrl || `${process.env.PUBLIC_URL}/images/strap1.jpg`}
                                alt={product.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{product.title}</h3>
                                <p className="text-gray-600 mt-2">
                                    {product.description} <Link to={`../product/${product._id}`} >See more</Link>
                                </p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-xl font-bold text-pink-600">${product.price}</span>
                                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                                </div>
                                <div className="flex items-center mt-4 gap-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleQuantityChange(product._id, 'decrement')}
                                            disabled={isInCart || product.stock === 0}
                                            className={`px-3 py-1 rounded-lg ${isInCart || product.stock === 0 ? 'bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'}`}
                                        >
                                            -
                                        </button>
                                        <span className="text-xl">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(product._id, 'increment')}
                                            disabled={isInCart || quantity >= product.stock || product.stock === 0}
                                            className={`px-3 py-1 rounded-lg ${isInCart || product.stock === 0 ? 'bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (product.stock > 0) {
                                                if (isInCart) {
                                                    removeProductFromCart(product._id);
                                                } else {
                                                    addToCartByQuantity(product, quantity);
                                                }
                                            }
                                        }}
                                        disabled={product.stock === 0}
                                        className={`px-4 py-2 rounded-lg ${product.stock === 0 ? 'bg-gray-300 text-gray-600' : isInCart ? 'bg-red-500 hover:bg-red-600' : 'bg-pink-500 hover:bg-pink-600'} text-white`}
                                    >
                                        {product.stock === 0 ? 'Sin stock' : isInCart ? 'Remove from Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Shop;
