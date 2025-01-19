import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ emailOrUsername: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData.emailOrUsername, formData.password);
            toast.success('Login successful!');
            navigate('/'); 
        } catch (error) {
            toast.error(error.message); 
        }
    };
    




    return (
        <div className="flex items-center justify-center min-h-screen bg-pink-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-md p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">Log In</h2>

                <div className="mb-4">
                    <label
                        htmlFor="emailOrUsername"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Email or Username
                    </label>
                    <input
                        type="text"
                        id="emailOrUsername"
                        name="emailOrUsername"
                        value={formData.emailOrUsername}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${errors.emailOrUsername ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400`}
                        placeholder="Enter your email or username"
                        required
                    />
                    {errors.emailOrUsername && (
                        <p className="text-red-500 text-sm mt-1">{errors.emailOrUsername}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400`}
                        placeholder="Enter your password"
                        required
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                {errors.form && <p className="text-red-500 text-sm mb-4">{errors.form}</p>}

                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-300"
                >
                    Log In
                </button>

                <div className="mt-4 text-center">
                    <Link to={"/forgot-password"} className="text-sm text-pink-600 hover:underline">
                        Forgot your password?
                    </Link>
                </div>
                <div className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to={'/signup'} className="text-pink-600 no-underline">
                        Sign up here.
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
