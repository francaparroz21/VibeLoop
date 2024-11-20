import React, { useState, useContext } from 'react';
import Logo from '../Logo/Logo.jsx';
import { FaCartPlus } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { IoMdPerson } from "react-icons/io";
import { IoMenu, IoClose } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext'; 
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react"; 
import '../../index.css'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); 

    const { cart, updateCartQuantity, removeFromCart } = useContext(ProductContext);
    const { user, logout } = useContext(AuthContext); 

    const cartCount = cart.length;

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleLogout = () => {
        setModalOpen(true); 
    };

    const confirmLogout = () => {
        logout();
        setModalOpen(false); 
    };

    const cancelLogout = () => {
        setModalOpen(false); 
    };

    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
    };

    const handleUpdateQuantity = (itemId, newQuantity) => {
        updateCartQuantity(itemId, newQuantity);
    };

    return (
        <header className='bg-[#ffeff9] fixed top-0 w-full items-center justify-between border-b border-gray-100 p-2 font-sans font-semibold uppercase text-text-primary backdrop-blur-[100px] dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary z-50'>
            <nav className='navbar mx-3 flex items-center justify-between'>
                <div className="flex items-center w-1/3 md:hidden">
                    <button onClick={() => setIsOpen(true)} className='flex items-center'>
                        <IoMenu className='h-5 w-5 text-slate-200' />
                    </button>
                </div>

                <div className="nav-center flex w-1/3 space-x-5 justify-center md:justify-start">
                    <Link className='nav-link nav-link-home' to='/'>
                        <Logo />
                    </Link>
                    <div className="hidden md:flex md:items-center">
                        <ul className="flex flex-col gap-5 mt-4 md:flex-row md:mt-0">
                            <NavLink to='/' className='nav-item-li transition duration-800 ease-in-out hover:text-[#8ae083]'>
                                <li>Home</li>
                            </NavLink>
                            <NavLink to='/shop' className='nav-item-li transition duration-800 ease-in-out hover:text-[#8ae083]'>
                                <li>Shop</li>
                            </NavLink>
                            <NavLink to='/contact' className='nav-item-li transition duration-800 ease-in-out hover:text-[#8ae083]'>
                                <li>Contact</li>
                            </NavLink>
                        </ul>
                    </div>
                </div>

                <div className="nav-right my-auto flex gap-1 relative w-1/3 justify-end items-center">
                    {user && <span>Hello, <span className='text-green-500'>{user.username}</span></span>}
                    <div className='p-2 cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-[#d3cfcf]'>
                        {user ? (
                            <button
                                onClick={handleLogout} 
                                className='text-black flex items-center'
                            >
                                <MdLogout className='text-[30px]' />
                            </button>
                        ) : (
                            <Link className='text-black' to={'/login'}>
                                <IoMdPerson className='text-[30px]' />
                            </Link>
                        )}
                    </div>
                    <div
                        className="p-2 relative cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-[#d3cfcf]"
                        onClick={() => setCartOpen(true)}
                    >
                        <FaCartPlus className='text-[30px]' />
                        <span className="absolute top-0 -translate-y-0 right-0 bg-[#8ae083] text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                            {cartCount}
                        </span>
                    </div>
                </div>
            </nav>

            <Dialog
                open={modalOpen}
                onClose={() => setModalOpen(false)} 
                className="dialog"
            >
                <DialogHeading className="heading">Are you sure to log out?</DialogHeading>
                <div className="buttons">
                    <Button className="button" onClick={confirmLogout}>Confirm</Button>
                    <DialogDismiss className="button secondary" onClick={cancelLogout}>Cancel</DialogDismiss>
                </div>
            </Dialog>

            <div className={`fixed h-screen inset-y-0 right-0 bg-[#ffeff9] p-5 transition-transform duration-300 ease-in-out z-50 ${cartOpen ? 'translate-x-0' : 'translate-x-full'
                } w-3/4 md:w-96 lg:w-1/3 max-w-md flex flex-col`}>
                <button onClick={() => setCartOpen(false)} className='absolute top-4 left-4'>
                    <IoClose className='hover:text-[#84cc6d] h-6 w-6 text-gray-800' />
                </button>
                <h2 className='text-center text-xl font-semibold mb-4'>Your Cart</h2>

                <div className="flex-grow overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-rounded-lg">
                    {cart.length === 0 ? (
                        <p className='mt-3'>No items added to the cart yet.</p>
                    ) : (
                        <ul>
                            {cart.map(item => (
                                <li key={item._id} className="flex flex-wrap items-center justify-between gap-4 mb-4 p-2 border-b border-gray-200">
                                    <img src={item.imageUrl} alt={item.title} className="w-12 h-12 object-cover rounded" />
                                    <div className="flex flex-col flex-grow">
                                        <p className="text-sm font-semibold">{item.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                onClick={() => handleUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                                disabled={item.quantity <= 1}
                                                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-xs"
                                            >
                                                -
                                            </button>
                                            <span className="text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item._id, Math.min(item.stock, item.quantity + 1))}
                                                disabled={item.quantity >= item.stock}
                                                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-xs"
                                            >
                                                +
                                            </button>
                                            <span className="ml-2 font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromCart(item._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="flex gap-5 flex-col border-t pt-4">
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total Amount:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className='text-center'>
                            <Link to={'../../checkout'} className='btn-checkout w-full py-2 px-4 mt-4 text-white font-semibold uppercase bg-[#8ae083] rounded-lg hover:bg-green-600 transition duration-300'>
                                Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {cartOpen && (
                <div
                    className="fixed inset-0 h-screen bg-black opacity-50 z-40"
                    onClick={() => setCartOpen(false)}
                ></div>
            )}

        </header>
    );
};

export default Navbar;
