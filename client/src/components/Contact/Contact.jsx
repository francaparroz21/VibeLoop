import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSent, setIsSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send('service_vibeloop', 'template_fb437if', formData, 'ALHxx5bQWYSrLZfrE')
            .then((result) => {
                console.log('Email sent successfully!', result.text);
                setIsSent(true);
                setFormData({ name: '', email: '', message: '' });
            }, (error) => {
                console.error('Failed to send email.', error.text);
            });
    };

    return (
        <div className="flex flex-col mt-16 items-center bg-pink-50 p-20 rounded-lg shadow-md max-w-lg mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">We would like to hear from you! Please fill out the form below to get in touch.</p>
            
            {isSent && <p className="text-green-500 font-semibold mb-4">Your message has been sent successfully!</p>}
            
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-gray-700 font-semibold">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-300"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-300"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="message" className="text-gray-700 font-semibold">Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-300 h-32 resize-none"
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-pink-500 text-white font-semibold py-2 rounded-md hover:bg-pink-600 transition-colors"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
