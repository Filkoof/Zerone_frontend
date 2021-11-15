import io from 'socket.io-client'

const url = 'http://147.78.64.57:1111';

const socket = io(url, {
  transports: ['websocket'],
})

export function authorizationIo(){
  const token = localStorage.getItem('user-token');

  if(!token){
    setTimeout(()=>{
      authorizationIo();
    },5000)
  }

  socket.connect();
  socket.emit('auth', {
    token: token
  })
}

function checkAuthorization(){
  socket.once('auth-response', response=>{
    if(response == 'ok') return;
    authorizationIo();
  });
}

export function disconnectIo(){
  socket.disconnect();
}

let callbackMessages = null;

export function getMessage(callback){
  checkAuthorization();

  if(typeof callback !== 'function') throw new TypeError('callback is not function')
  if(callbackMessages) return;

  socket.on('message', response=>{
    callback(response);
  });

  callbackMessages = callback;
}
