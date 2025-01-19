import React from 'react';
import { Link } from 'react-router-dom';

function HowToUse() {
    return (
        <div>
            <section id="how-to-use" className="bg-pink-100 py-16 text-center">
                <h2 className="text-4xl font-bold mb-12 text-gray-800">How to use</h2>

                <div className="flex flex-col md:flex-row md:justify-center gap-8">
                    {/* Step 1 */}
                    <div className="bg-[#e1b2d0] rounded-lg shadow-lg p-6 w-full md:w-1/4 flex flex-col items-center group transition-transform transform duration-500 hover:scale-105">
                        <div className="overflow-hidden rounded-lg flex justify-center w-full">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/asdd-e8832.appspot.com/o/steps-home%2Fstep1.jpg?alt=media&token=0d3a42ac-40d2-4962-89c1-ecb4a2f97eff"
                                alt="Paso 1"
                                className="w-3/4 sm:w-2/3 md:w-40 lg:w-48 h-auto object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                            />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Step 1: Take a phone strap.</h3>
                        <p className="text-gray-600 text-center">Pick a stylish and functional strap that fits your vibe—it's all you need to start personalizing your accessory!</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-[#e1b2d0] rounded-lg shadow-lg p-6 w-full md:w-1/4 flex flex-col items-center group transition-transform transform duration-500 hover:scale-105">
                        <div className="overflow-hidden rounded-lg flex justify-center w-full">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/asdd-e8832.appspot.com/o/steps-home%2Fstep2.jpg?alt=media&token=67b8d509-fab4-46cf-bd08-dbd30dbf9078"
                                alt="Paso 2"
                                className="w-3/4 sm:w-2/3 md:w-40 lg:w-48 h-auto object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                            />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Step 2: Find an accessory to attach it.</h3>
                        <p className="text-gray-600 text-center">Decide where you want to add a touch of style—your phone, keys, bag, or anything else that needs a little charm.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-[#e1b2d0] rounded-lg shadow-lg p-6 w-full md:w-1/4 flex flex-col items-center group transition-transform transform duration-500 hover:scale-105">
                        <div className="overflow-hidden rounded-lg flex justify-center w-full">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/asdd-e8832.appspot.com/o/steps-home%2Fstep3.jpg?alt=media&token=1ac8df81-4875-4b6a-9ef9-74946a609094"
                                alt="Paso 3"
                                className="w-3/4 sm:w-2/3 md:w-40 lg:w-48 h-auto object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                            />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Step 3: Tie a knot.</h3>
                        <p className="text-gray-600 text-center">Tie a quick and easy knot to keep it in place, and you’re ready to show it off with confidence! 😄</p>
                    </div>
                </div>

                <Link to={'/shop'} className="mt-12 inline-block bg-pink-500 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-pink-600 transition duration-300">
                    Shop Now
                </Link>
            </section>
        </div>
    );
}

export default HowToUse;
