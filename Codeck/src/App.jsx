import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import React, { useState } from 'react'
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./API/api"
import MeetingView from './components/MeetingView';

function JoinScreen(){
  return null;
}

function VideoComponent(props){
  return null;
}

function Controls(props){
  return null;
}

function Container(props){
  return null;
}

const App = () => {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async(id) => {
    const meetingId = id == null ? await createMeeting({token: authToken}) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Test User",
        mode: "CONFERENCE",
      }}
      token={authToken}
      // reinitialiseMeetingOnConfigChange={true}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <div className="cosmic-bg min-h-screen relative">
      <div className="stars absolute inset-0 z-0"></div>
      <div className="relative z-10">
        <Navbar/>
        <Hero getMeetingAndToken={getMeetingAndToken} />
      </div>
    </div>
  );
}



export default App
