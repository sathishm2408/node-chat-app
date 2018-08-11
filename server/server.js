const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');
const {Users}=require('./utils/users');

const {generateMessage,generateLocationMessage}=require('./utils/message.js');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
var {isRealString}=require('./utils/validation.js');
var users=new Users();

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log('New user connected');
	
	/*socket.emit('newMessage',{
			from:"Admin",
			text:"welcome to chat app",
			createdAt:new Date().getTime()
		});
		
		socket.broadcast.emit('newMessage',{
			from:"admin",
			text:"New user joined",
			createdAt:new Date().getTime()
		});
	*/
	
	//socket.emit('newMessage',generateMessage("Admin","welcome to chat app"));
		
		
	//socket.broadcast.emit('newMessage',generateMessage("admin","New user joined"));
			
	socket.on('join',(params,callback)=>{
		if(!isRealString(params.name)|| !isRealString(params.room)){
			return callback('Name and room name are required');
		}
		
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id,params.name,params.room);
		
		io.to(params.room).emit('updateUserList',users.getUserList(params.room));
		
		socket.emit('newMessage',generateMessage("Admin","welcome to chat app"));
		socket.broadcast.to(params.room).emit('newMessage',generateMessage("admin",params.name+" joined"));
		callback();
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
	
	/*socket.on('createMessage',function(message){
		console.log('createMessage',message);
		io.emit('newMessage',{
			from:message.from,
			text:message.text,
			createdAt:new Date().getTime()
		});
		*/
		
	socket.on('createMessage',function(message,callback){
		var user=users.getUser(socket.id);
		
		if(user&& isRealString(message.text)){
		io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
		}
		
		callback();
	});
		
	socket.on('createLocationMessage',function(coords){
		var user=users.getUser(socket.id);
		if(user){
		io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
		}
	});
	
	
		/*
		socket.broadcast.emit('newMessage',{
			from:message.from,
			text:message.text,
			createdAt:new Date().getTime()
		});
		*/
	
	
	/*
	socket.emit('newMessage',{
		from:"sachu",
		text:"whats up",
		createdAt:5645
	});
	*/
	
	socket.on('disconnect',()=>{
		//console.log('User was disconnected');
		var user=users.removeUser(socket.id);
		if(user){		
		io.to(user.room).emit('updateUserList',users.getUserList(user.room));
		io.to(user.room).emit('newMessage',generateMessage("Admin",user.name+" has left"));
		}	
	});
});

server.listen(port,()=>{
	console.log('Server is up on port');
})