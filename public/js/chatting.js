const socket = io('/');
        
socket.on('connection',()=>{
    console.log('connected');
});

let sendMessage = (message)=>{
    socket.emit('message', message);
    // -> 전체에 메세지 보냄
};

socket.on('disconnect',(reason)=>{  //종료된 그순간 부터 나옴
    console.log('disconnected Reason:',reason);
    // -> 접속 끊어졌다고 알림
})

socket.on('reconnect_attempt',(attemptCount)=>{
    if(attemptCount > 5){
        socket.disconnect();        //접속 완전종료
        // -> 접속 완전히 종료됨을 알림 -> 재접속 실패.
        return;
    }
    // -> 접속 재시도를 말함
    console.log('Trying to Connecting :'+ attemptCount);
});

//Normal Message
socket.on('Message',(packet)=>{
    // -> 일반 메세지 전송
    console.log(packet)
})

//Admin Message
socket.on('Broadcast',(packet)=>{
    // -> 어드민 메세지
    console.log(packet);
});

/* 
    추가할 내용

1. 어드민 강퇴기능?
2. 각자의 식별자를 찾기.
3. 퇴장 및 접속

*/