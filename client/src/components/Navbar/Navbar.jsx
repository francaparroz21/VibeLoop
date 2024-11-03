import React, { useState } from 'react'
import Logo from '../Logo/Logo.jsx'
import { FaCartPlus } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom'
import { MdFavorite } from "react-icons/md";


function Navbar() {

    const [cartCount, setCartCount] = useState(0);

    return (
        <header className='bg-[#ffeff9] sticky top-0 w-full items-center justify-between border-b border-gray-100 bg-background p-[2em] font-sans font-semibold uppercase text-text-primary backdrop-blur-[100px] dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary'>
            <nav className='navbar flex justify-between'>
                <div className="w-1/3 flex nav-left gap-20">
                    <div>
                        <Link className='nav-link nav-link-home' to={'/'}>
                            <Logo />
                        </Link>

                    </div>
                    <div className="nav-item my-auto">
                        <ul className='flex gap-5'>
                            <NavLink to='/' className='nav-item-li transition duration-800 ease-in-out hover:text-[#8ae083]'>
                                <li>
                                    Home
                                </li>
                            </NavLink>
                            <NavLink to='/shop' className='nav-item-li transition duration-800 ease-in-out hover:text-[#8ae083]'>
                                <li>
                                    Shop
                                </li>
                            </NavLink>
                            <NavLink to='/contact' className='nav-item-li transition duration-800 ease-in-out hover:text-[#8ae083]'>
                                <li>
                                    Contact
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                </div>
                <div className="nav-right my-auto flex gap-2">
                    <MdFavorite className='text-[30px]' />
                    <FaCartPlus className='text-[30px]' />
                    <span className="absolute top-11 right-5 bg-[#8ae083] text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                        {cartCount}
                    </span>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
