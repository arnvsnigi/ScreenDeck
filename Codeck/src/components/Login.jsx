import React, { useState } from 'react';
import Navbar from './Navbar';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   

    return (
        <>
        <Navbar />
        <div className="cosmic-bg min-h-screen relative">
        <div className="stars absolute inset-0 z-0"></div>
        <div className="twinkling absolute inset-0 z-0"></div>
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 bg-[#1a1f35]/80 backdrop-blur-lg rounded-xl shadow-xl border border-[#2a3449] relative z-1">
                <h1 className='text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-[#ff2e6a] to-[#3399ff] bg-clip-text text-transparent'>Log In</h1>
                
                <form action="" method='POST' className="space-y-6">
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#8892b0] mb-2">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-[#0f1729] border border-[#2a3449] rounded-lg focus:outline-none focus:border-[#ff2e6a] text-white"
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[#8892b0] mb-2">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-[#0f1729] border border-[#2a3449] rounded-lg focus:outline-none focus:border-[#ff2e6a] text-white"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full relative group mt-6"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff2e6a] to-[#3399ff] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative px-4 py-2 bg-[#1a2236] rounded-lg text-white text-sm font-medium group-hover:bg-[#242f4d] transition duration-300 text-center">
                           Login
                        </div>
                    </button>
                </form>
            </div>
        </div>
        </div>
        </>
    );
};

export default Login;