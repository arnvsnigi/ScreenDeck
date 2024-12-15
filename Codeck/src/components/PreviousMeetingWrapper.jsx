import React from 'react';
import MeetingCard from './MeetingCard';

const PreviousMeetingWrapper = ({ meeting }) => {
    return (<>

        {/* <h1>Previous Meetings</h1> */}
        <h1 className='text-3xl font-bold text-white mt-8'>Previous Meetings</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-[#1a1f35]/80 backdrop-blur-lg p-8 rounded-2xl border border-[#2a3449] mt-4">
       {(!meeting || meeting.length === 0 )&& <h2 className='text-3xl font-bold text-white'>No Previous Meetings to Show</h2>}
        {meeting  && meeting.map((item,index)=><MeetingCard key={index} item={item}/>)}         
        </div>
                    
        </>       
                    
                         
        
        
    )
}

export default PreviousMeetingWrapper;