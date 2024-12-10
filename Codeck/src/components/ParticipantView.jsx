import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import React, { useMemo, useEffect, useRef ,useState} from 'react';
import MeetingFooter from './MeetingFooter';

function ParticipantView(props) {
    const micRef = useRef(null);
    const videoRef = useRef(null);
    const screenRef = useRef(null);
    
    const {webcamOn,micOn,webcamStream,micStream,isLocal,displayName} = useParticipant(props.participantId);
   
    const {screenShareStream,screenShareOn} =useParticipant(props.presenterId)

   //Video Stream
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

    //Cedia stream from the screen share stream
    const mediaStream = useMemo(() => {
      if (screenShareOn && screenShareStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(screenShareStream.track);
        return mediaStream;
      }
    }, [screenShareStream, screenShareOn]);

    useEffect(()=>{
      if(screenRef.current){
        if(screenShareOn && screenShareStream){
          screenRef.current.srcObject = new MediaStream([screenShareStream.track]);
          screenRef.current.play().catch((error) => {
            console.error("screenRef.current.play() failed", error);
          });
        }else{
          screenRef.current.srcObject = null;
        }
      }
    })
  
    
    //Mic Stream
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
      <div className="bg-gray-900 rounded-lg p-4 h-full w-full">
        <div className="relative aspect-video ">
          
          {webcamOn && videoStream &&!screenShareOn ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={isLocal}
              className="w-full h-full rounded-lg object-cover "
            />
          ) : !screenShareOn && (
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
          

          {/* //Screen Share */}
          {props.presenterId && screenShareOn && 
            <video ref={screenRef} autoPlay playsInline  muted={isLocal} className="w-full h-full rounded-lg object-cover "
            />
          }


      
          <MeetingFooter screenShareOn={screenShareOn} displayName={displayName} webcamOn={webcamOn} micOn={micOn} participantId={props.participantId}/>

        </div>
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
        
      </div>
    );
}

export default ParticipantView;