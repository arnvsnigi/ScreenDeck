const authToken = import.meta.env.VITE_VIDEO_SDK_AUTH_TOKEN;

export const createMeeting = async({token})=>{
    const res=await fetch("https://api.videosdk.live/v2/rooms",{
        method:"POST",
        headers:{
            'Authorization': `${authToken}`,
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({})
    });
    const {roomId}=await res.json();
    console.log("Room ID:",roomId);
    return roomId;
        
}