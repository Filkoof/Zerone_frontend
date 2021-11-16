import io from 'socket.io-client'

const url = 'http://147.78.64.57:1111';

const socket = io(url, {
  transports: ['websocket'],
})

socket.removeListener=function(name){
  if(socket._callbacks[`$${name}`]){
    delete socket._callbacks[`$${name}`];
  }
};

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

export function disconnectIo(){
  socket.disconnect();
}

let messageCallback;

export function setMessageCallback(callback){
  if(typeof callback !== 'function') throw new TypeError('callback is not function')
  if(messageCallback) return;

  messageCallback = callback;
}

export async function getMessage(){
  socket.emit('newListener')

  socket.on('auth-response', response=>{
    if(response == 'not'){
      authorizationIo();
    }else{
      socket.removeListener('message')
      socket.on('message', response=>{
        messageCallback(response);
      });
    }
  });
}

export function submitTypingMessage(data){
  socket.emit('start-typing', data)
}

export function submitFinishTypingMessage(data){
  socket.emit('stop-typing', data)
}

export function checkTypingMessage(callback){
  if(typeof callback !== 'function') throw new TypeError('callback is not function')

  socket.emit('newListener')

  socket.on('auth-response', response=>{
    if(response == 'not'){
      authorizationIo();
    }else{
      socket.removeListener('start-typing', callback);
      socket.on('start-typing', response=>{
        callback(response);
      });
    }
  });
}

export function checkFinishTypingMessage(callback){
  if(typeof callback !== 'function') throw new TypeError('callback is not function')

  socket.emit('newListener')

  socket.on('auth-response', response=>{
    if(response == 'not'){
      authorizationIo();
    }else{
      socket.removeListener('stop-typing', callback);
      socket.on('stop-typing', response=>{
        callback(response);
      });
    }
  });
}

