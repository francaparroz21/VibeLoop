import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <header className=''>
            <nav className='navbar'>
                <div className="nav-item">
                    <Link className='nav-link nav-link-home' to={'/'}>
                        <img src={process.env.PUBLIC_URL + '/images/logowbg.jpg'} alt="logo" />
                    </Link>
                </div>
                <div className="nav-item">
                    <ul>
                        <NavLink to='/' className='nav-item-li'>
                            Home
                        </NavLink>
                        <NavLink to='/shop' className='nav-item-li'>
                            Shop
                        </NavLink>
                        <NavLink to='/contact' className='nav-item-li'>
                            Contact us
                        </NavLink>
                    </ul>
                </div>
                <div className="nav-item">

                </div>
            </nav>
        </header>
    )
}

export default Navbar
