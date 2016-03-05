var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
cors = require('cors');
var request = require('request');
var bodyParser = require('body-parser');
const host = 'http://netrunnersserver.eu-gb.mybluemix.net';
const contextroot = ''

app.use(bodyParser.json());
app.use(cors());

app.get('/',function(req,res){
     res.sendFile(__dirname + '/test.html');
});

app.get('/getBill/:billId', function(req, res){
  var billId = req.params.billId;
  console.log('/getBill request', billId);
  request.post({
                url: host + contextroot + '/getBill.json',
                json: true,
                headers: {
                  "content-type": "application/json",
                },
                body: { "billId" : billId }
              },
              function handleResponse(error, response, body){
                console.log('/getBill response', error, body);
                if(!error && body && body.status === 'OK'){
                  res.send(body);
                } else {
                  console.log('Error happened');
                  res.send(error);
                }
  });
});

app.post('/setBillOwner', function(req, res){
  var body = req.body;
  console.log('/setBillOwner request arrived', body);
  request.post({
                url: host + contextroot + '/setBillOwner.json',
                json: true,
                headers: {
                  "content-type": "application/json",
                },
                body: body
              },
              function handleResponse(error, response, body){
                console.log('/SetBillOwner response arrived',error, body);
                if(!error && body && body.status === 'OK'){
                  res.send(body);
                } else {
                  console.log('Error happened');
                  res.send(error);
                }
              });



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
