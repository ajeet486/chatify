import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server=http.createServer(app);


export function getReceiverSocketId(userId){
return userSocketMap[userId];
}

const io =new Server(server,{
  cors:{
   origin:["http://localhost:5173"],

  }
});

// used to store online users
const userSocketMap={};// {userId:socketId


io.on("connection",(socket)=>{
 console.log("A user connected",socket.id);
 const userId=socket.handshake.query.userId;
if(userId){
  userSocketMap[userId]=socket.id;
}
// send events to all connected clients
io.emit("getOnlineUsers",Object.keys(userSocketMap));
 socket.on("disconnect",()=>{
  console.log("A user disconnected",socket.id);
  // Remove the user from the online users list
  if(userId){
    delete userSocketMap[userId];
  }
  // send updated online users list
  io.emit("getOnlineUsers",Object.keys(userSocketMap));
 });
})

export{io,server,app};