import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
            scrolled 
            ? 'bg-[#0f1729]/95 backdrop-blur-md shadow-lg border-b border-[#2a3449]' 
            : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] bg-clip-text text-transparent hover:scale-105 transition-transform">
                            Aransh
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#home" className="text-[#8892b0] hover:text-[#ff2e6a] transition-colors duration-300 text-sm uppercase tracking-wider">
                            Home
                        </a>
                        <a href="#about" className="text-[#8892b0] hover:text-[#ff2e6a] transition-colors duration-300 text-sm uppercase tracking-wider">
                            About
                        </a>
                        <a href="#services" className="text-[#8892b0] hover:text-[#ff2e6a] transition-colors duration-300 text-sm uppercase tracking-wider">
                            Services
                        </a>
                        <a href="#contact" className="text-[#8892b0] hover:text-[#ff2e6a] transition-colors duration-300 text-sm uppercase tracking-wider">
                            Contact
                        </a>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <a href="#Login" className="text-[#8892b0] hover:text-[#ff2e6a] transition-colors duration-300 text-sm font-medium">
                            Login
                        </a>
                        <a href="#SignUp" className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff2e6a] to-[#3399ff] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative px-4 py-2 bg-[#1a2236] rounded-lg text-sm font-medium text-white group-hover:text-white transition-colors duration-300 border border-[#2a3449] group-hover:border-transparent">
                                Sign Up
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;