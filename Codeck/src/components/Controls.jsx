import React from 'react';
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';

function Controls() {
    const{toggleMic,toggleWebcam,leave}=useMeeting();

    const handleToggleWebcam = () => {
      // Toggling webcam
      toggleWebcam();
    };
    const handleMic=()=>{
      toggleMic();
    }
    
  
    return (
      <div className="flex gap-4 justify-center my-4">
        <button 
          onClick={toggleMic} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Toggle Mic
        </button>
        <button 
          onClick={toggleWebcam}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Toggle Webcam
        </button>
        <button 
          onClick={leave}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Leave
        </button>
      </div>
    );
}

export default Controls;