import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { products, cart, addToCartByQuantity, removeFromCart } = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const selectedProduct = products.find(product => product._id === id);
        setProduct(selectedProduct);

        if (selectedProduct) {
            
            const cartItem = cart.find(item => item._id === selectedProduct._id);
            if (cartItem) {
                setQuantity(cartItem.quantity); 
            } else {
                setQuantity(1); 
            }
        }
    }, [id, products, cart]);

    if (!product) return <div className="p-16 flex justify-center items-center h-screen text-lg">Loading...</div>;

    const isInCart = cart.some(item => item._id === product._id);

    const handleQuantityChange = (action) => {
        if (action === 'increment' && quantity < product.stock) {
            setQuantity(quantity + 1);
        } else if (action === 'decrement' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="product-detail h-screen flex justify-center m-16 py-16 px-4 md:px-8 max-w-screen-lg mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center mb-4 md:mb-0">
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-auto rounded-lg shadow-lg object-cover"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product.title}</h1>
                    <p className="text-lg text-gray-600 mb-6">{product.description}</p>
                    <p className="text-xl font-bold text-gray-900 mb-6">Price: ${product.price}</p>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => handleQuantityChange('decrement')}
                            disabled={isInCart} 
                            className={`px-4 py-2 ${isInCart ? 'bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'} rounded-lg`}
                        >
                            -
                        </button>
                        <span className="text-xl">{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange('increment')}
                            disabled={isInCart} 
                            className={`px-4 py-2 ${isInCart ? 'bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'} rounded-lg`}
                        >
                            +
                        </button>
                    </div>

                    <div className="flex gap-4 mt-6">
                        {isInCart ? (
                            <button
                                onClick={() => removeFromCart(product._id)}
                                className="bg-red-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors duration-300"
                            >
                                Remove from Cart
                            </button>
                        ) : (
                            <button
                                onClick={() => addToCartByQuantity(product, quantity)}
                                className="bg-[#8ae083] text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors duration-300"
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
