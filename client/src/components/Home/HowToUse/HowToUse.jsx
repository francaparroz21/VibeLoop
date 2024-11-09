import React from 'react';
import { Link } from 'react-router-dom';

function HowToUse() {
    return (
        <div className=''>
            <section id="how-to-use" className="bg-pink-100 py-16 text-center">
                <h2 className="text-4xl font-bold mb-12 text-gray-800">How to use</h2>

                <div className="flex flex-col md:flex-row md:justify-center gap-8">
                    <div className="bg-[#e1b2d0] rounded-lg shadow-lg p-6 w-full md:w-1/4 flex flex-col items-center">
                        <img
                            src={process.env.PUBLIC_URL + '/images/strap1.jpg'}
                            alt="Paso 1"
                            className="w-3/4 sm:w-2/3 md:w-40 lg:w-48 h-auto object-cover rounded-md mb-4"
                        />
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Step 1: Take a phone strap.</h3>
                        <p className="text-gray-600 text-center">Una sola pastilla es todo lo que necesitas.</p>
                    </div>

                    <div className="bg-[#e1b2d0] rounded-lg shadow-lg p-6 w-full md:w-1/4 flex flex-col items-center">
                        <img
                            src={process.env.PUBLIC_URL + '/images/strap1.jpg'}
                            alt="Paso 2"
                            className="w-3/4 sm:w-2/3 md:w-40 lg:w-48 h-auto object-cover rounded-md mb-4"
                        />
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Step 2: Find an accessory to attach it.</h3>
                        <p className="text-gray-600 text-center">Choose where to secure it—phone, keys, bag, or more.</p>
                    </div>

                    <div className="bg-[#e1b2d0] rounded-lg shadow-lg p-6 w-full md:w-1/4 flex flex-col items-center">
                        <img
                            src={process.env.PUBLIC_URL + '/images/strap1.jpg'}
                            alt="Paso 3"
                            className="w-3/4 sm:w-2/3 md:w-40 lg:w-48 h-auto object-cover rounded-md mb-4"
                        />
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Step 3: Tie a knot.</h3>
                        <p className="text-gray-600 text-center">Make a simple knot to keep it secure and enjoy! 😁</p>
                    </div>
                </div>

                <Link to={'/shop'} className='mt-12 inline-block bg-pink-500 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-pink-600 transition duration-300'>
                    Shop Now
                </Link>
            </section>
        </div>
    );
}

export default HowToUse;
