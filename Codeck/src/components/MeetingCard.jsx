import React from 'react';

const MeetingCard = ({item}) => {
    // Dynamic color mapping for status
    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'upcoming':
                return {
                    text: 'text-[#3399ff]',
                    border: 'border-[#3399ff]'
                };
            case 'completed':
                return {
                    text: 'text-green-400',
                    border: 'border-green-400'
                };
            case 'cancelled':
                return {
                    text: 'text-red-400',
                    border: 'border-red-400'
                };
            default:
                return {
                    text: 'text-[#8892b0]',
                    border: 'border-[#8892b0]'
                };
        }
    };
    console.log(item);

    return (
        <div className="transform transition-all duration-300 hover:scale-105 w-full max-w-sm">
            <div className={`
                flex flex-col items-center justify-center gap-5 
                ${getStatusColor(item.status).bg}
                backdrop-blur-lg p-8 rounded-3xl 
                border-2 ${getStatusColor(item.status).border}
                shadow-lg hover:shadow-2xl 
                transition-all duration-300
                relative
                overflow-hidden
            `}>
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 
                    bg-gradient-to-r from-[#3399ff]/10 to-[#ff2ec4]/10 
                    opacity-50 blur-lg -z-10"></div>

                <h2 className="text-3xl font-bold 
                    bg-clip-text text-transparent 
                    bg-gradient-to-r from-[#3399ff] to-[#ff2ec4]">
                    {item.title || 'Untitled Meeting'}
                </h2>
                
                <div className="space-y-2 text-center w-full">
                    {[
                        { label: 'Date', text: new Date(item.date).toLocaleDateString(), key: 'date' },
                        { label: 'Time', text: formatter.format(new Date(item.date)).toLocaleString(), key: 'time' },
                        { label: 'Duration', text: item.duration+" sec", key: 'duration' }
                    ].map((detail) => (
                        <p 
                            key={detail.key} 
                            className="text-[#8892b0] text-sm flex items-center justify-center gap-2"
                        >
                            <span className="font-semibold text-[#3399ff] mr-2">{detail.label}:</span>
                            {detail.text || 'Not specified'}
                        </p>
                    ))}

                    <p className={`
                        text-sm font-semibold mt-4 
                        flex items-center justify-center gap-2
                        ${getStatusColor(item.status).text}
                    `}>
                        <span className="font-semibold mr-2">Status:</span>
                        {item.status || 'Unknown Status'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MeetingCard;