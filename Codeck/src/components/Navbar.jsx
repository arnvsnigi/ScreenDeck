import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

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

    const activeClassName = "text-[#ff2e6a] transition-colors duration-300 text-sm uppercase tracking-wider";
    const inactiveClassName = "text-[#8892b0] hover:text-[#ff2e6a] transition-colors duration-300 text-sm uppercase tracking-wider";

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
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] bg-clip-text text-transparent hover:scale-105 transition-transform">
                            Aransh
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                            end
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                        >
                            About
                        </NavLink>
                        <NavLink 
                            to="/services" 
                            className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                        >
                            Services
                        </NavLink>
                        <NavLink 
                            to="/contact" 
                            className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                        >
                            Contact
                        </NavLink>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="text-[#8892b0] hover:text-[#ff2e6a] transition-colors duration-300 text-sm font-medium">
                            Login
                        </Link>
                        <Link to="/signup" className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff2e6a] to-[#3399ff] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative px-4 py-2 bg-[#1a2236] rounded-lg text-white text-sm font-medium group-hover:bg-[#242f4d] transition duration-300">
                                Sign Up
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;