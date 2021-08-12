const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const router = require('./routers/route');
const nameMaker = require('./function/nameChecker');

//Set static
app.use(express.static(__dirname + '/public'));

//Set routers
app.use('/', router);

io.on('connection', (socket) => {
	//접속 전체 통보
	socket.socketNick = nameMaker.getName();
	console.log(socket.handshake.address + ':connected / id:' + socket.socketNick);
	socket.broadcast.emit('join', socket.socketNick);

	socket.on('getList', () => {
		let list = nameMaker.getList().filter(element => element !== socket.socketNick);
		socket.emit('existingInfo', {myName: socket.socketNick, userList: list});
	})

	socket.on('msg', (message) => {
		//일반 메세지 전체 통보 및
		//xss 공격 방지
		socket.broadcast.emit('msg', {
			nick: socket.socketNick,
			msg: message.replace(/</g, '&lt;').replace(/>/g, '&gt;')
		});
	});

	socket.on('disconnect', (reason) => {
		//접속 종료 전체 통보
		nameMaker.removeName(socket.socketNick);
		io.emit("exit", socket.socketNick);
		console.log('reason: ' + reason + " disconnected " + socket.id);
	});

	socket.on('nickEdit', (request) => {
		let {newNickname} = request;

		if (nameMaker.isNameExist(newNickname)) {
			socket.emit('nickEditFail');
		} else {
			nameMaker.replaceUserName(socket.socketNick, newNickname);
			socket.socketNick = newNickname;

			socket.emit('nickEditSuccess');
			socket.broadcast.emit('nickEditSuccess');
		}
	});
});

http.listen(3001, () => {
	console.log('Chatting Server Open');
})