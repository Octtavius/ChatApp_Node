var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT ||4000;

app.get('/', function(req, res){
    res.sendFile(__dirname+ "/index.html");
});

io.on('connection', function(socket){
    console.log(socket.id);
    console.log("a user connected");
    socket.on('disconnect', function(){
        console.log('user disconnected')
    });
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        // console.log('message: ' + msg);

        //get the message from the sender and emit it, send to everyone
        io.emit('chat message', msg);
    })
})

http.listen(port, function(){
    console.log("Running on PORT: " + port);
})

// var app = require("express")();
// var http = require('http').Server(app);
//
// app.get('/', function(req, res){
//     res.sendFile(__dirname + "/index.html");
// });
//
// http.listen(4000, function(){
//     console.log('listening on port: 4000');
// })