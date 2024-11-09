import React, { useState } from 'react';
import Logo from '../Logo/Logo.jsx';
import { FaCartPlus } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";
import { IoMenu, IoClose } from "react-icons/io5";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    return (
        <header className='bg-[#ffeff9] fixed top-0 w-full items-center justify-between border-b border-gray-100 bg-background p-2 font-sans font-semibold uppercase text-text-primary backdrop-blur-[100px] dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary z-50'>
            <nav className='navbar mx-3 flex items-center justify-between'>
                <div className="flex items-center w-1/3 md:hidden">
                    <button onClick={() => setIsOpen(true)} className='flex items-center'>
                        <IoMenu className='h-5 w-5 text-slate-200' />
                    </button>
                </div>

                <div className={`nav-center flex w-1/3 space-x-5 justify-center md:justify-start`}>
                    <Link className='nav-link nav-link-home' to='/'>
                        <Logo />
                    </Link>
                    <div className={`md:flex md:items-center hidden md:flex-row`}>
                        <ul className={`flex flex-col gap-5 mt-4 md:flex-row md:mt-0`}>
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
                    <MdFavorite className='text-[30px]' />
                    <div
                        className="p-2 relative cursor-pointer rounded-full transition duration-200 ease-in-out hover:bg-[#d3cfcf]"
                        onClick={() => setCartOpen(true)}
                    >
                        <FaCartPlus className='text-[30px]' />
                        <span className={`absolute top-0 -translate-y-0 right-0 bg-[#8ae083] text-white rounded-full text-xs w-4 h-4 flex items-center justify-center`}>
                            {cartCount}
                        </span>
                    </div>
                </div>
            </nav>

            {/* Offcanvas del menú lateral izquierdo */}
            <div className={`fixed inset-0 h-screen bg-[#ffeff9] p-5 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                <button onClick={() => setIsOpen(false)} className='absolute top-4 right-4'>
                    <IoClose className='hover:text-[#84cc6d] h-6 w-6 text-gray-800' />
                </button>
                <ul className='mt-10 flex flex-col gap-y-6'>
                    <NavLink to='/' className='nav-item-li text-xl hover:text-[#84cc6d] transition' onClick={() => setIsOpen(false)}>
                        <li>Home</li>
                    </NavLink>
                    <NavLink to='/shop' className='nav-item-li text-xl hover:text-[#84cc6d] transition' onClick={() => setIsOpen(false)}>
                        <li>Shop</li>
                    </NavLink>
                    <NavLink to='/contact' className='nav-item-li text-xl hover:text-[#84cc6d] transition' onClick={() => setIsOpen(false)}>
                        <li>Contact</li>
                    </NavLink>
                </ul>
            </div>

            {/* Overlay para el menú lateral izquierdo */}
            {isOpen && (
                <div
                    className="fixed inset-0 h-screen bg-black opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Offcanvas del carrito en el lado derecho */}
            <div className={`fixed h-screen inset-y-0 right-0 bg-[#ffeff9] p-5 w-64 transform ${cartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                <button onClick={() => setCartOpen(false)} className='absolute top-4 left-4'>
                    <IoClose className='hover:text-[#84cc6d] h-6 w-6 text-gray-800' />
                </button>
                <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
                <div>
                    {/* Aquí se mostrarán los items añadidos al carrito en el futuro */}
                    <p>No items added to the cart yet.</p>
                </div>
            </div>

            {/* Overlay para el offcanvas del carrito */}
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
