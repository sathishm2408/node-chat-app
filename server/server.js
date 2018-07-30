const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');


const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log('New user connected');
	
	/*
	socket.emit('newEmail',{
		from:"server",
		text:"new email",
		createdAt:5645
	});
	
	socket.on('createEmail',function(email){
		console.log('createEmail from browser',email);
	});
	*/
	
	socket.on('createMessage',function(message){
		console.log('createMessge from browser',message);
	});
	
	socket.emit('newMessage',{
		from:"sachu",
		text:"whats up",
		createdAt:5645
	});
	
	socket.on('disconnect',()=>{
		console.log('User was disconnected');
	});
});

server.listen(port,()=>{
	console.log('Server is up on port');
})