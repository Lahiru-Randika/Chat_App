// If we use the normal server method the messages at the receiver end is not updated
// at real time. To see the messages he have to refresh the page
// again and again. But because of the socekt.io server part, it will automatically updates and
// refreshed and the real time communication will be possible.

import { Server } from "socket.io";
import http from "http";
import express from "express";

//express server
const app = express();

//On top of the express server we are creating the socket server
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        // origin:["http://localhost:3000"],
        origin:["https://chat-app-j9g5.vercel.app"],
        methods: ["GET", "POST"]
    }
});


export const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId];
}

//{userId: socketId}
const userSocketMap = {}; 


io.on('connection',(socket)=>{
    console.log('A user connected ',socket.id);

    //take the userId from the front end ( query=>userId)
    const userId = socket.handshake.query.userId;

    if(userId && userId!="undefined"){
        userSocketMap[userId] = socket.id;
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    }

    //io.emit() is used to send events to all the connected clients
    //this will immediately says who is online and who is offline
    //so we can grab that with that event name => "getOnlineUsers"
    // io.emit('getOnlineUsers', Object.keys(userSocketMap))

    //socket.on() is used to listen to the events. This can be used on both client and server sides
    socket.on('disconnect',()=>{
        console.log('A user disconnected ',socket.id)

        for (const [id, socketId] of Object.entries(userSocketMap)) {
            if (socketId === socket.id) {
                delete userSocketMap[id];
                break;
            }
        }

        //connect again after the disconnection
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})


export {app, io, server}