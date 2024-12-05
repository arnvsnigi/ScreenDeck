import React, { useState, useEffect } from 'react';
import { useMeeting,useParticipant } from '@videosdk.live/react-sdk';
import Controls from './Controls';
import ParticipantView from './ParticipantView';

function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
     

    //timer
    useEffect(() => {
      let timer;
      if (joined === "JOINED") {
        const startTime = Date.now();
        timer = setInterval(() => {
          setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
      }
      return () => clearInterval(timer);
    }, [joined]);

    const formatTime = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    

    const {join,participants,localParticipant,presenterId} = useMeeting({
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

    const { screenShareStream, screenShareOn } = useParticipant(presenterId);

    const uniqueParticipants = Array.from(participants.values()).reduce((acc, participant) => {
      if (participant.id !== localParticipant?.id && !acc.some(p => p.id === participant.id)) {
        acc.push(participant);
      }
      return acc;
    }, []);
  
    return (
      <div className="min-h-screen bg-[#0f1729] p-6 w-full">
        <div className="max-w-[2400px] mx-auto relative ">
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
              <div className="flex flex-col items-center space-y-4">
                <h3 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] bg-clip-text text-transparent">
                    Meeting Room
                  </span>
                </h3>
                
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <div className="px-4 py-2 rounded-xl bg-[#1a2236] border border-[#2a3449]">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-[#ff2ec4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      <span className="text-[#8892b0]">ID: {props.meetingId}</span>
                    </div>
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-[#1a2236] border border-[#2a3449]">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-[#ff2ec4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-[#8892b0] font-mono">{formatTime(elapsedTime)}</span>
                    </div>
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-[#1a2236] border border-[#2a3449]">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-[#3399ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-[#8892b0]">{participants.size} Participants</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-[#ff2ec4]/30 to-transparent"></div>
              </div>
            </div>
          </div>
          
          {joined === "JOINED" ? (
            <div className="relative space-y-8 w-full mx-auto my-auto">
             
              {/* Participants grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-2 gap-6 ">
                {/* Local participant */}
                {localParticipant && (
                  <div className="relative group aspect-video">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] rounded-xl opacity-30 group-hover:opacity-75 blur transition duration-300"></div>
                    <div className="relative rounded-xl bg-[#0f1729] p-2 backdrop-blur-xl border border-white/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl"></div>
                      <ParticipantView participantId={localParticipant.id}  />
                    </div>
                  </div>
                )}
                
                {/* Remote participants */}
                {uniqueParticipants.map((participant) => (
                  <div key={participant.id} className="relative group aspect-video">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] rounded-xl opacity-30 group-hover:opacity-75 blur transition duration-300"></div>
                    <div className="relative rounded-xl bg-[#0f1729] p-2 backdrop-blur-xl border border-white/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl"></div>
                      <ParticipantView participantId={participant.id}  />
                    </div>
                  </div>
                ))}

                 {/* screen participant */}
                 {presenterId && screenShareOn && (
                  <div className="relative group aspect-video">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] rounded-xl opacity-30 group-hover:opacity-75 blur transition duration-300"></div>
                    <div className="relative rounded-xl bg-[#0f1729] p-2 backdrop-blur-xl border border-white/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl"></div>
                      <ParticipantView participantId={null}  presenterId={presenterId}/>
                    </div>
                  </div>
                )}

                
              </div>
             
            
               <Controls />
              
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