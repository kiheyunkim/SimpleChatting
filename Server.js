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
    //접속 전체 통보
    socket.socketNick = nameMaker.GetName();
    console.log(socket.handshake.address + ':connected / id:' + socket.socketNick);
    socket.broadcast.emit('Join', socket.socketNick);
    let list = nameMaker.GetList().filter(element=>element!==socket.socketNick);
    socket.on('GetList',()=>{
        console.log(list);
        socket.emit('List',list);
    })

    socket.on('Msg',(message)=>{
        //일반 메세지 전체 통보 및 
        //xss 공격 방지
        socket.broadcast.emit('Msg',{nick:socket.socketNick, msg:message.replace(/</g,'&lt;').replace(/>/g,'&gt;')});
    });

    socket.on('disconnect',(reason)=>{
        //접속 종료 전체 통보
        nameMaker.RemoveName(socket.socketNick);
        io.emit("Exit",socket.socketNick);
        console.log('reason: '+ reason + " disconnected " + socket.id);
    });
});

http.listen(3001,()=>{
    console.log('Chatting Server Open');
})