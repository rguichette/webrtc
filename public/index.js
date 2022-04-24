const socket = io()

const fromSocket = document.getElementById("userId")
const localVideo = document.getElementById("localVideo")
const call = document.getElementById("call")
const mute = document.getElementById("mute")
const stop = document.getElementById("stop")
const unMute = document.getElementById('unMute')
const toSocket = document.getElementById('toSocket')

let tracks = []

let config = {iceServers:[{urls:["stun:stun.l.google.com:19302"]}]}
let peer = new RTCPeerConnection(config)

let fromSocketId, toSocketId;


socket.on('connect', ()=>{
    fromSocket.innerHTML = socket.id
    //person creating the offer: 
    fromSocketId = socket.id;
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
       console.log("streams: ", stream);
       return stream;
    }catch(error){
        console.log(error);
    }

}
//Create Offer
const createOffer = async ()=>{
    
    try {
        let stream = await openMediaDevices();
        tracks.forEach(track => peer.addTrack(track))
       
    //    console.log("tracks:" ,stream.getTracks); 
        
        // .forEach(track => peer.addTrack(track));


        let offer = await peer.createOffer()
        peer.setLocalDescription(new RTCSessionDescription(offer));
        // console.log("peer - offer",peer, offer.sdp);

        //person offer being sent to: 
        toSocketId = toSocket.value
        //send offer to server 
        socket.emit('offer',{"offer": offer, "fromSocketId": fromSocketId, "toSocketId": toSocketId})


    } catch (error) {
        console.log(error);
        
    }
}

//receive offer
socket.on("offer", data =>console.log(data))


//start a call
call.onclick = ()=> { 

    // openMediaDevices()

    createOffer()
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



