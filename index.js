var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var ftpd = require('ftp-server');
var rn = require('random-number');

ftpd.fsOptions.root = 'http://3starinfo.in//porject/chat_nodeapp/index.js';

app.get('/',function(req,res){
	var r_num = {  min:  0, max:  100, integer: true};
	var r_id = rn(r_num);
	console.log(r_id);
	res.send('<a href="http://127.0.0.1:8021/:'+r_id+'">id link</a>');
	//res.sendFile(__dirname + '/index.html');
	//console.log('hello');
});

app.get('/:r_id',function(req,res){
	res.sendFile(__dirname + '/index.html');
	//console.log('hello');
});

io.on('connection', function(socket){
	console.log('a user connected');
  socket.on('chat message', function(msg){
    //console.log('message: ' + msg);
	io.emit('chat message', msg.user+ ' : ' +msg.msg);
  });
});

ftpd.listen(21);
http.listen(8021,'0.0.0.0', function(){
      console.log('listening on *:8021');
});