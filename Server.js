const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const Router = require('./Router/route');
const nameMaker = require('./Controller/nameChecker');

//Set static
app.use(express.static(__dirname + '/public'));

//Set Router
app.use('/', Router);

io.on('connection',(socket)=>{
    socket.socketNick = nameMaker.GetName();
    console.log(socket.handshake.address + ':connected / id:' + socket.socketNick);
    io.emit('Join', socket.socketNick);//접속 전체 통보
    
    socket.on('Msg',(message)=>{ //일반 메세지 전체 통보
        io.emit('Msg',{nick:socket.socketNick, msg:message});
    });

    socket.on('disconnect',(reason)=>{//접속 종료 전체 통보
        nameMaker.RemoveName(socket.socketNick);
        io.emit("Exit",socket.socketNick);
        console.log('reason: '+ reason + " disconnected " + socket.id);
    });
});

http.listen(3001,()=>{
    console.log('Chatting Server Open');
})