var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connect', function(socket){

  console.log('client connected, socket', socket);

});





http.listen(3000, function(){
  console.log('shareManager listening on *:3000');
});
