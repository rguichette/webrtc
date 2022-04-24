const express = require('express');
const app = express();
let http = require("http")
let httpServer = http.createServer(app)
const socketio = require("socket.io")

let port = process.env.PORT || 4000;


app.use(express.static('public'));


httpServer.listen(port, () => {
    console.log(`Example app listening on ${port}!`);
});


const io = socketio(httpServer);

io.on("connection", (socket)=>{

    //receive/send offer
    socket.on("offer", data =>{
        // console.log("offer received from:" ,data.fromSocketId );
        io.to(data.toSocketId).emit('offer', data)
        // io.emit('offer', data)

    })

    //Receive and send answer
    socket.on("answer", data =>{
        io.to(data.destination).emit('answer',data)


    })
    //Caller Ice candidate
    socket.on('callerCandidate', data =>{ 
        console.log(data)
 
        io.to(data.toSocketId).emit('calleCandidate', data.candidate)
    
    } )

    socket.on('calleeCandidate', data =>{ 
        console.log(data)

        io.to(data.destination).emit('calleeCandidate', data.candidate)
    
    } )


})
