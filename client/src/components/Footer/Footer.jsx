import React from 'react';

function Footer() {
    return (
        <footer className="bg-[#e1b2d0] text-gray-800 py-10 px-6 bg-[#debbd9]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">

                <div className="mb-8 md:mb-0">
                    <h4 className="text-lg font-semibold text-pink-700">Stay in the Know</h4>
                    <p className="text-sm mt-2">Sign up for 10% off your first order.</p>
                    <div className="mt-4 flex flex-col sm:flex-row">
                        <input
                            type="email"
                            placeholder="Enter email address"
                            className="w-full sm:w-auto p-2 border border-pink-400 rounded-md mb-3 sm:mb-0 sm:mr-3 focus:outline-none"
                        />
                        <button className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                    <div>
                        <h4 className="text-lg font-semibold text-pink-700">Shop</h4>
                        <ul className="mt-2 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-pink-500">All Products</a></li>
                            <li><a href="#" className="hover:text-pink-500">Phone Straps</a></li>
                            <li><a href="#" className="hover:text-pink-500">Accessories</a></li>
                            <li><a href="#" className="hover:text-pink-500">Sets</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-pink-700">Learn</h4>
                        <ul className="mt-2 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-pink-500">About Us</a></li>
                            <li><a href="#" className="hover:text-pink-500">Sustainability</a></li>
                            <li><a href="#" className="hover:text-pink-500">Our Story</a></li>
                            <li><a href="#" className="hover:text-pink-500">Store Locator</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-pink-700">Help</h4>
                        <ul className="mt-2 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-pink-500">Account</a></li>
                            <li><a href="#" className="hover:text-pink-500">Wholesale</a></li>
                            <li><a href="#" className="hover:text-pink-500">FAQs</a></li>
                            <li><a href="#" className="hover:text-pink-500">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-pink-700">Follow</h4>
                        <ul className="mt-2 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-pink-500">Instagram</a></li>
                            <li><a href="#" className="hover:text-pink-500">Twitter</a></li>
                            <li><a href="#" className="hover:text-pink-500">TikTok</a></li>
                            <li><a href="#" className="hover:text-pink-500">Facebook</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300 mt-8 pt-4 text-center">
                <p className="text-sm text-gray-600">© 2024 VibeLoop. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
