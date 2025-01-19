import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

function FloatingWhatsapp() {
    return (
        <div>
            <a
                href="https://wa.me/+31685462478"
                target="_blank"
                rel="noopener noreferrer"
                className="group fixed bottom-4 right-4 z-50"
            >
                <div
                    className="bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
                >
                    <FaWhatsapp className="text-3xl" />
                </div>
            </a>
        </div>
    )
}

export default FloatingWhatsapp
