import React, { useContext } from 'react';
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import { meetingService } from '../services/api';
import { AuthContext } from '../store/AuthContextProvider';

function Controls({meetingTitle,meetingId,participants,elapsedTime}) {
    const{toggleMic,toggleWebcam,toggleScreenShare,leave}=useMeeting();
    const {isLoggedIn}=useContext(AuthContext);

    const handleToggleWebcam = () => {
      // Toggling webcam
      toggleWebcam();
    };
    const handleMic=()=>{
      toggleMic();
    }
    const handleScreenShare=()=>{
      toggleScreenShare();
    }
    const handleLeave=async()=>{
      if(!isLoggedIn){
        leave();
        return;
      }
      
      const userId=JSON.parse(localStorage.getItem('user')).id;
      const meetingData={
        meetingId:meetingId,
        title:meetingTitle,
        date:new Date(),
        participants:participants,
        duration:elapsedTime,
        status:"completed"
      }
      try{
        const response=await meetingService.createMeeting(userId,meetingData);
        if(response){
          console.log("Meeting registered successfully");
        }
      }catch(err){
        console.log(err);
      }
      leave();
    }
    
  
    return (
      <>
      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-6 mb-4 ">
      {/* Mic Button */}
      <div className="relative group transform hover:scale-105 transition-all duration-300">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] rounded-2xl opacity-30 group-hover:opacity-100 blur-lg transition-all duration-300"></div>
        <button 
          onClick={handleMic}
          className="relative px-8 py-4 bg-[#0f1729] rounded-2xl backdrop-blur-xl border border-white/10 group-hover:bg-[#1d1f33]/50"
        >
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-[#ff2ec4] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-white font-medium">Toggle Mic</span>
          </div>
        </button>
      </div>

      {/* Webcam Button */}
      <div className="relative group transform hover:scale-105 transition-all duration-300">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#3399ff] via-[#ff2ec4] to-[#ff2e6a] rounded-2xl opacity-30 group-hover:opacity-100 blur-lg transition-all duration-300"></div>
        <button 
          onClick={handleToggleWebcam}
          className="relative px-8 py-4 bg-[#0f1729] rounded-2xl backdrop-blur-xl border border-white/10 group-hover:bg-[#1d1f33]/50"
        >
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-[#3399ff] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="text-white font-medium">Toggle Webcam</span>
          </div>
        </button>
      </div>

      {/* Screenshare Button */}
      <div className="relative group transform hover:scale-105 transition-all duration-300">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#3399ff] via-[#ff2ec4] to-[#ff2e6a] rounded-2xl opacity-30 group-hover:opacity-100 blur-lg transition-all duration-300"></div>
        <button 
          onClick={handleScreenShare}
          className="relative px-8 py-4 bg-[#0f1729] rounded-2xl backdrop-blur-xl border border-white/10 group-hover:bg-[#1d1f33]/50"
        >
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-[#3399ff] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="text-white font-medium">Toggle ScreenShare</span>
          </div>
        </button>
      </div>

      {/* Leave Button */}
      <div className="relative group transform hover:scale-105 transition-all duration-300">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#ff2e6a] to-[#ff2e6a] rounded-2xl opacity-30 group-hover:opacity-100 blur-lg transition-all duration-300"></div>
        <button 
          onClick={handleLeave}
          className="relative px-8 py-4 bg-[#0f1729] rounded-2xl backdrop-blur-xl border border-white/10 group-hover:bg-[#1d1f33]/50"
        >
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-[#ff2e6a] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-white font-medium">Leave Meeting</span>
          </div>
        </button>
      </div>
    </div>

    </>
    );
}

export default Controls;