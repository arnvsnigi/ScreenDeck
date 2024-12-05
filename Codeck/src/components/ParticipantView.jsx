import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import React, { useMemo, useEffect, useRef ,useState} from 'react';

function ParticipantView(props) {
    const micRef = useRef(null);
    const videoRef = useRef(null);
    
    const {webcamOn,micOn,webcamStream,micStream,isLocal,displayName} = useParticipant(props.participantId);
    const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream;
      }
      return null;
    }, [webcamStream, webcamOn]);
  
    useEffect(() => {
      if (videoRef.current) {
        if (webcamOn && videoStream) {
          const videoTrack = videoStream.getVideoTracks()[0];
          if (videoTrack) {
            videoRef.current.srcObject = new MediaStream([videoTrack]);
            videoRef.current.play().catch((error) => {
                console.error("videoRef.current.play() failed", error);
              });
          }
        } else {
          videoRef.current.srcObject = null;
        }
      }
    }, [videoStream, webcamOn]);

    useEffect(() => {
      if (micRef.current) {
        if (micOn && micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);
  
          micRef.current.srcObject = mediaStream;
          micRef.current
            .play()
            .catch((error) => {
              console.error("micRef.current.play() failed", error);
            });
        } else {
          micRef.current.srcObject = null;
        }
      }
    }, [micStream, micOn]);
  
    return (
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="relative aspect-video">
          {webcamOn && videoStream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={isLocal}
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <>
            <div className="w-full h-full bg-gradient-to-b from-[#1d1f33] to-[#17192d] rounded-xl flex items-center justify-center overflow-hidden">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff2e6a] via-[#ff2ec4] to-[#3399ff] opacity-20 blur-lg"></div>
                <svg className="w-20 h-20 text-[#8892b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            </>
          )}
          <div className="absolute bottom-2 left-2 right-2">
            <div className="backdrop-blur-md bg-gradient-to-r from-[#1d1f33]/90 to-[#17192d]/90 rounded-lg border border-white/10 px-3 py-2">
              <div className="flex justify-between items-center">
                <span className="text-[#8892b0] font-medium">{displayName || "Participant"}</span>
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
          
        
          
        </div>
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
        
      </div>
    );
}

export default ParticipantView;