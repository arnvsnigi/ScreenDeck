import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { authService } from '../services/api';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const validHandler = (inputType, event) => {
        setError('');
        if (inputType === 'name') setName(event.target.value);
        if (inputType === 'email') setEmail(event.target.value);
        if (inputType === 'password') setPassword(event.target.value);
        if (name !== '' && email !== '' && password !== '' && email.includes('@') && email.includes('.')) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        setIsLoading(true);
        setError('');

        try {
            await authService.signup({
                username: name,
                email,
                password
            });
            navigate('/login');
        } catch (err) {
            setError(err.message || 'An error occurred during signup');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <Navbar />
        <div className="cosmic-bg min-h-screen relative">
            <div className="stars absolute inset-0 z-0"></div>
            <div className="twinkling absolute inset-0 z-0"></div>
            <div className="container mx-auto px-4 flex justify-center items-center min-h-[80vh]">
                <div className="w-full max-w-md p-8 bg-[#1a1f35]/80 backdrop-blur-lg rounded-xl shadow-xl border border-[#2a3449] relative z-1">
                    <h1 className='text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-[#ff2e6a] to-[#3399ff] bg-clip-text text-transparent'>
                        Sign Up
                    </h1>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#8892b0] mb-2">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                value={name} 
                                onChange={(e) => validHandler('name', e)}
                                className="w-full px-4 py-2 bg-[#0f1729] border border-[#2a3449] rounded-lg focus:outline-none focus:border-[#ff2e6a] text-white"
                                placeholder="Enter your name"
                                disabled={isLoading}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#8892b0] mb-2">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => validHandler('email', e)}
                                className="w-full px-4 py-2 bg-[#0f1729] border border-[#2a3449] rounded-lg focus:outline-none focus:border-[#ff2e6a] text-white"
                                placeholder="Enter your email"
                                disabled={isLoading}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#8892b0] mb-2">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => validHandler('password', e)}
                                className="w-full px-4 py-2 bg-[#0f1729] border border-[#2a3449] rounded-lg focus:outline-none focus:border-[#ff2e6a] text-white"
                                placeholder="Enter your password"
                                disabled={isLoading}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className={`w-full relative group mt-6 ${!isValid || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!isValid || isLoading}
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff2e6a] to-[#3399ff] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative px-4 py-2 bg-[#1a2236] rounded-lg text-white text-sm font-medium group-hover:bg-[#242f4d] transition duration-300 text-center">
                                {isLoading ? "Signing up..." : isValid ? "Sign Up" : "Enter Valid Details"}
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default SignUp;