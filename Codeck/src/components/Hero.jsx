import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useContext } from 'react'
import { AuthContext } from '../store/AuthContextProvider'
import PreviousMeetingWrapper from './PreviousMeetingWrapper'
import { meetingService } from '../services/api'


const Hero = ({ getMeetingAndToken,meetingTitleHandler,meetingTitle }) => {
  const {name,nameHandler,isLoggedIn}=useContext(AuthContext);
  const [meetingId, setMeetingId] = useState("");
  const [meetingData,setMeetingData]=useState([]);
  

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

  useEffect(()=>{
    async function fetchData(){
      if(!isLoggedIn){
        return;
      }
      const userId=JSON.parse(localStorage.getItem('user')).id;
      try{
        const response=await meetingService.getUserMeetings(userId);
        console.log("Meetings being fetched");
        setMeetingData(response.meetings);
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[isLoggedIn]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="w-full max-w-4xl px-4 py-8 mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-[#3399ff] to-white bg-clip-text text-transparent">{isLoggedIn?"Welcome":"Welcome to"}</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff]">
              {isLoggedIn?name:"ScreenDeck"}
            </span>
          </h1>
          <p className="text-[#8892b0] text-lg">Start or join a meeting with just one click</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-[#1a1f35]/80 backdrop-blur-lg p-8 rounded-2xl border border-[#2a3449]">

          <div className="w-full md:w-1/2 flex flex-col gap-4">

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff2e6a] to-[#3399ff] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <input
                type="text"
                placeholder="Enter Meeting Title (Required)"
                value={meetingTitle}
                onChange={meetingTitleHandler}
                className="relative w-full bg-[#1a2236] border-2 border-[#f8799d] rounded-lg p-4 text-white placeholder-[#8892b0] focus:outline-none focus:border-[#ff2e6a] focus:ring-2 focus:ring-[#ff2e6a]/20 transition-all duration-300"
              />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
            <Card title="Start Meeting" onClick={startMeeting} />
            </div>
            <p className="text-[#8892b0] text-center">Create a new meeting instantly</p>
          </div>
          



          {/* --------------------------------------------- */}
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
        {isLoggedIn && <PreviousMeetingWrapper meeting={meetingData}/>}
      </div>
    </div>
  )
}

export default Hero