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
	
	socket.emit('newMessage',{
			from:"Admin",
			text:"welcome to chat app",
			createdAt:new Date().getTime()
		});
		
		socket.broadcast.emit('newMessage',{
			from:"admin",
			text:"New user joined",
			createdAt:new Date().getTime()
		});
	
	
	
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
		console.log('createMessage',message);
		io.emit('newMessage',{
			from:message.from,
			text:message.text,
			createdAt:new Date().getTime()
		});
		/*
		socket.broadcast.emit('newMessage',{
			from:message.from,
			text:message.text,
			createdAt:new Date().getTime()
		});
		*/
	});
	
	/*
	socket.emit('newMessage',{
		from:"sachu",
		text:"whats up",
		createdAt:5645
	});
	*/
	
	socket.on('disconnect',()=>{
		console.log('User was disconnected');
	});
});

server.listen(port,()=>{
	console.log('Server is up on port');
})