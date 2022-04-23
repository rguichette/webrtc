const socket = io()

const fromSocket = document.getElementById("userId")
const localVideo = document.getElementById("localVideo")
const call = document.getElementById("call")
const mute = document.getElementById("mute")
const stop = document.getElementById("stop")
const unMute = document.getElementById('unMute')

let tracks = []



socket.on('connect', ()=>{
    fromSocket.innerHTML = socket.id
})

//using constructor 

let stream1 = new MediaStream();
console.log("stream1", stream1);
setTimeout(()=>{console.log("stream1 tracks",stream1.getTracks());}, 2000)

//get local Media
const openMediaDevices = async() =>{
    try{
       let stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true})
       localVideo.srcObject = stream;

       tracks = stream.getTracks()
    }catch(error){
        console.log(error);
    }

}

//start a call
call.onclick = ()=> { 

    openMediaDevices()
    mute.onclick =  muteTracks;
    unMute.onclick = unMuteTracks;
    stop.onclick = stopTracks;
    
}

//mute tracks 
const muteTracks = ()=>{
    console.log("tracks...",tracks);
    tracks.forEach(track => track.enabled = false)
    tracks.forEach(track =>console.log("track is .... ", track))
    // mute.onclick = muteTracks;

}

//unmute

const unMuteTracks = ()=>{
    tracks.forEach(track =>track.enabled = true)
}

//stop tracks
const stopTracks =() =>{
    tracks.forEach(track =>track.stop())
}



