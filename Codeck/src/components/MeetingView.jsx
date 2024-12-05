import React, { useState, useEffect } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import Controls from './Controls';
import ParticipantView from './ParticipantView';

function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    const{toggleMic,toggleWebcam,leave}=useMeeting();

    const handleToggleWebcam = () => {
      toggleWebcam();
    };
    const handleMic=()=>{
      toggleMic();
    }
    const {join,participants,localParticipant} = useMeeting({
      onMeetingJoined: () => {
        setJoined("JOINED");
      },
      onMeetingLeft: () => {
        props.onMeetingLeave();
      },
      onError: (error) => {
        console.error("Meeting Error:", error);
      }
    });
    
    useEffect(() => {
      if (!joined) {
        setJoined("JOINING");
        join();
      }
    }, [join]);

    const uniqueParticipants = Array.from(participants.values()).reduce((acc, participant) => {
      if (participant.id !== localParticipant?.id && !acc.some(p => p.id === participant.id)) {
        acc.push(participant);
      }
      return acc;
    }, []);
  
    return (
      <div className="min-h-screen bg-[#0f1729] p-6">
        <div className="container mx-auto relative">
          {/* Background grid effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Meeting header */}
          <div className="relative mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] rounded-2xl opacity-30 blur-lg"></div>
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-[#1d1f33]/90 to-[#17192d]/90 backdrop-blur-xl border border-white/10">
              <div className="flex flex-col items-center space-y-3">
                <h3 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] bg-clip-text text-transparent">
                    Meeting Room
                  </span>
                </h3>
                <p className="text-[#8892b0]">ID: {props.meetingId}</p>
                <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-[#ff2ec4]/30 to-transparent"></div>
              </div>
            </div>
          </div>
          
          {joined === "JOINED" ? (
            <div className="relative space-y-8">
              {/* Controls */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
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

                {/* Leave Button */}
                <div className="relative group transform hover:scale-105 transition-all duration-300">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ff2e6a] to-[#ff2e6a] rounded-2xl opacity-30 group-hover:opacity-100 blur-lg transition-all duration-300"></div>
                  <button 
                    onClick={leave}
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

              {/* Participants grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Local participant */}
                {localParticipant && (
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] rounded-xl opacity-30 group-hover:opacity-75 blur transition duration-300"></div>
                    <div className="relative rounded-xl bg-[#0f1729] p-2 backdrop-blur-xl border border-white/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl"></div>
                      <ParticipantView participantId={localParticipant.id} />
                    </div>
                  </div>
                )}
                
                {/* Remote participants */}
                {uniqueParticipants.map((participant) => (
                  <div key={participant.id} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] rounded-xl opacity-30 group-hover:opacity-75 blur transition duration-300"></div>
                    <div className="relative rounded-xl bg-[#0f1729] p-2 backdrop-blur-xl border border-white/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl"></div>
                      <ParticipantView participantId={participant.id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative text-center p-8 rounded-xl bg-gradient-to-r from-[#1d1f33]/50 to-[#17192d]/50 backdrop-blur-lg border border-white/10">
              <p className="text-lg bg-gradient-to-r from-[#ff2e6a] to-[#3399ff] bg-clip-text text-transparent font-medium">
                {joined === "JOINING" ? "Joining the meeting..." : "Initializing..."}
              </p>
            </div>
          )}
        </div>
      </div>
    );
}
  
export default MeetingView;