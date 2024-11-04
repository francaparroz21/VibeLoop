import React, { useState } from 'react';
import Logo from '../Logo/Logo.jsx';
import { FaCartPlus } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";
import { IoMenu, IoClose } from "react-icons/io5";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    return (
        <header className='bg-[#ffeff9] sticky top-0 w-full items-center justify-between border-b border-gray-100 bg-background p-[2em] font-sans font-semibold uppercase text-text-primary backdrop-blur-[100px] dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary'>
            <nav className='navbar flex items-center justify-between'>
                <div className="flex items-center w-1/3 md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className='flex items-center'>
                        <IoMenu className='h-5 w-5 text-slate-200' />
                    </button>
                </div>

                <div className={`nav-center flex w-1/3 space-x-5`}>
                    <Link className='nav-link nav-link-home'>
                        <Logo />
                    </Link>
                    <div className={`md:flex md:items-center ${isOpen ? 'flex flex-col items-center' : 'hidden md:flex-row'}`}>
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

                <div className="nav-right my-auto flex gap-2 relative w-1/3 justify-end">
                    <MdFavorite className='text-[30px]' />
                    <div className="relative">
                        <FaCartPlus className='text-[30px]' />
                        <span className={`absolute top-0 -translate-y-1/2 right-0 bg-[#8ae083] text-white rounded-full text-xs w-4 h-4 flex items-center justify-center`}>
                            {cartCount}
                        </span>
                    </div>
                    {isOpen && (
                        <button onClick={() => setIsOpen(!isOpen)} className='flex items-center md:hidden'>
                            <IoClose className='h-5 w-5 text-gray-800' />
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
