var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/',function(req,res){
     res.sendFile(__dirname + '/test.html');
});


io.on('connect', function(socket){
  console.log(socket.id,'client connected, socket');
  socket.on('disconnect', function(data){ console.log(socket.id,'client disconnected'); });

  socket.on('msg', function(data){
    console.log(socket.id,'msg arrived', data);
    data = data || {};
    data.id = socket.id;
    socket.broadcast.emit('echo', data);
  });

});

http.listen(3000, function(){
  console.log('shareManager listening on *:3000');
});
