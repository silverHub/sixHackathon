var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
cors = require('cors');
var request = require('request');

app.use(cors());

app.get('/',function(req,res){
     res.sendFile(__dirname + '/test.html');
});

app.get('/getBillDetails/*', function(req, res){
  res.send({"bill":{"billId":"123456789","ownerId":null,"createdTimestamp":"2016.03.05 04:03:31","billItems":[{"itemId":"123456789-1","itemName":"Hawaii pizza","quantity":2.00,"price":8.00,"totalPrice":16.00},{"itemId":"123456789-2","itemName":"Duff beer","quantity":6.00,"price":1.50,"totalPrice":9.00},{"itemId":"123456789-3","itemName":"Some dessert","quantity":1.00,"price":4.50,"totalPrice":4.50}]}})
});

app.post('/setBillOwner', function(req, res){
  res.send("Ack");
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
