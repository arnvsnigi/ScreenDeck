import React from 'react';

const Card = ({ title, onClick }) => {
    return (
        <div 
            className='relative group'
            onClick={onClick}
        >
            {/* Background glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff2e6a] to-[#3399ff] rounded-xl opacity-20 group-hover:opacity-40 blur-lg transition-all duration-300"></div>
            
            {/* Border gradient */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] rounded-xl group-hover:opacity-100 transition duration-300"></div>
            
            {/* Main card content */}
            <div className='relative p-[1px] rounded-xl'>
                <div className='relative px-8 py-4 rounded-[10px] bg-[#0f1729] backdrop-blur-xl transition-all duration-300 group-hover:bg-[#141b2d]'>
                    {/* Glass reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[10px]"></div>
                    
                    {/* Content */}
                    <div className="relative flex items-center justify-center space-x-2">
                        <h1 className="text-xl font-bold bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
                            {title}
                        </h1>
                        
                        {/* Arrow icon that appears on hover */}
                        <svg 
                            className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;