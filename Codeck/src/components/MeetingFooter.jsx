import { useMeeting } from '@videosdk.live/react-sdk';
import React, { useState, useEffect } from 'react';

const MeetingFooter = ({micOn,webcamOn,displayName,screenShareOn,participantId}) => {
    const [activeSpeakerId, setActiveSpeakerId] = useState(null);
    const { meetingId } = useMeeting({
      onSpeakerChanged: (activeSpeakerId) => {
        setActiveSpeakerId(activeSpeakerId);
      },
    });

    return (
        <div className="absolute bottom-2 left-2 right-2">
            <div className="backdrop-blur-md bg-gradient-to-r from-[#1d1f33]/90 to-[#17192d]/90 rounded-lg border border-white/10 px-3 py-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-[#8892b0] font-medium">{screenShareOn ? "Screen Share" : displayName || "Participant"}</span>
                  {activeSpeakerId === participantId && (
                    <div className="flex items-center">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2ec4] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff2ec4]"></span>
                      </span>
                      <span className="ml-2 text-[#ff2ec4] text-sm">Speaking</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {/* Mic Status */}
                  <div className={`transition-colors duration-300 ${micOn ? 'text-[#ff2ec4]' : 'text-[#8892b0]'}`}>
                    {micOn ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </div>

                  {/* Webcam Status */}
                  <div className={`transition-colors duration-300 ${webcamOn ? 'text-[#3399ff]' : 'text-[#8892b0]'}`}>
                    {webcamOn ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
};

export default MeetingFooter;