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
    console.log("a user is connected with id: ",socket.id );
})