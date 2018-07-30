
var socket=io();

socket.on('connect',function(){
console.log('connected to server');

/*
socket.emit('createMessage',{
	from:"sachu@gmail.com",
	text:"nope"
});
*/

});

socket.on('disconnect',function(){
console.log('Disconnected from server');
});


/*socket.on('newEmail',function(email){
	console.log('newEmail sent from server with ',email);
});
*/

socket.on('newMessage',function(message){
	console.log('newMessage ',message);
});
