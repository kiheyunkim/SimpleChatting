const express = require('express');
const app = express();
const http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/',(request,response)=>{
    response.redirect('/index.html');
});

http.listen(3001,()=>{
    console.log('Chatting Server Open');
})

io.on('connection',(socket)=>{
    console.log(socket.id + ': random user connected');
    io.emit('Join',{alert:socket.id});//접속 통보

    socket.on('message',(packet)=>{
        console.log(packet);
        io.emit('message',packet)
    });

    socket.on('disconnect',(reason)=>{
        console.log('reason: '+ reason + " disconnected " + socket.id);
    });
});


