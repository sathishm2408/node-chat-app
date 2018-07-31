
var socket=io();

socket.on('connect',function(){
console.log('connected to server');

/*socket.emit('createMessage',{
	from:"sachu@gmail.com",
	text:"nope"
},function(data){
	console.log('Got it ',data);
});
*/
});

socket.on('disconnect',function(){
console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
	console.log('newMessage',message);
	var li=jQuery('<li></li>');
	var t=message.from+':'+message.text;
	li.text(t);
	
	jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
	e.preventDefault();
	
	socket.emit('createMessage',{
	from:"User",
	text:jQuery('[name=message]').val()
},function(data){
	console.log('Got it ',data);
});
});

/*socket.on('newMessage',function(message){
	console.log('newMessage ',message);
});
*/