var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 4000;
app.use(express.static('public'));
app.get('/', function(req,res) {
  res.sendFile('./public/index.html' , { root : __dirname});
});
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
   console.log('user disconnected');
 });
 socket.on('line', function(line){
   if( typeof line !== "undefined")
    console.log('line: ' + line.x);
  else
    console.log('line: ' + line);
  socket.broadcast.emit('drawTouchline',line);
  });
  socket.on('clear',function(message) {
    if(message === 'all'){
      socket.broadcast.emit('clear','all');
    }
  });

});


http.listen(port, function(){
  console.log('listening on port '+ port);
});
