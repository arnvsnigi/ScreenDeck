import React, { useState } from 'react'
import Card from './Card'

const Hero = ({ getMeetingAndToken }) => {
  const [meetingId, setMeetingId] = useState("");

  const startMeeting = async () => {
    await getMeetingAndToken(null); // Create new meeting
  };

  const joinMeeting = async () => {
    if (meetingId) {
      await getMeetingAndToken(meetingId); // Join existing meeting
    } else {
      alert("Please enter a valid meeting ID");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1729] relative overflow-hidden">
      {/* Retro grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,#0f1729_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px] [background-position:center] opacity-20"></div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#ff2e6a]/10 via-transparent to-[#3399ff]/10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0f1729] to-transparent"></div>
      
      <div className="w-full max-w-4xl px-4 py-8 mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-[#3399ff] to-white bg-clip-text text-transparent">Welcome to</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff]">
              Aransh
            </span>
          </h1>
          <p className="text-[#8892b0] text-lg">Start or join a meeting with just one click</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-[#1a2236]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#2a3449]">
          <div className="w-full md:w-1/2 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Card title="Start Meeting" onClick={startMeeting} />
            </div>
            <p className="text-[#8892b0] mt-4">Create a new meeting instantly</p>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff2e6a] to-[#3399ff] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <input
                type="text"
                placeholder="Enter Meeting ID"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="relative w-full bg-[#1a2236] border-2 border-[#2a3449] rounded-lg p-4 text-white placeholder-[#8892b0] focus:outline-none focus:border-[#ff2e6a] focus:ring-2 focus:ring-[#ff2e6a]/20 transition-all duration-300"
              />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Card title="Join Meeting" onClick={joinMeeting} />
            </div>
            <p className="text-[#8892b0] text-center">Join an existing meeting</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero