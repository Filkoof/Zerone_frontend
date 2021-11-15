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
  socket.on('auth-response', response=>{
    if(response !== 'ok'){
      authorizationIo();
    }
  });
}

export function disconnectIo(){
  socket.disconnect();
}

let callbackMessages = null;

export async function getMessage(callback){
  if(typeof callback !== 'function') throw new TypeError('callback is not function')
  if(callbackMessages) return;
  await checkAuthorization();

  socket.on('message', response=>{
    callback(response);
  });

  callbackMessages = callback;
}

//****************

export function emit(eventName, data) {
  socket.emit(
    eventName,
    typeof data === 'object' && !Array.isArray(data) ? data : undefined
  )
}


export function on(eventName, callback) {
  socket.on(eventName, responseListener(callback))
}


export function once(eventName, callback) {
  socket.once(eventName, responseListener(callback))
}

export function ask(eventName, { data, callback }) {
  once(eventName + '-response', async response => {
    if (response.message === 'AUTHORIZATION_ERROR') {
      try {
        reRequestsOrder.push(() => ask(eventName, { data, callback }))
        await reAuthorization()
        return
      } catch (e) {
        if (window.location.pathname !== '/authorization') {
          router.push({ name: 'authorization' })
        }
      }
    }
    callback(response)
  })
  emit(eventName, data)
}

export function reAuthorization() {
  if (reAuthorization.reAuthorizationPromise)
    return reAuthorization.reAuthorizationPromise

  reAuthorization.reAuthorizationPromise = new Promise((resolve, reject) => {
    once('admin-auth-by-auth-code-response', res => {
      reAuthorization.reAuthorizationPromise = null
      if (res.message === 'USER_NOT_FOUND_ERROR') {
        return reject()
      }
      if (typeof reconnectionsCallback == 'function') {
        reconnectionsCallback(res)
      }
      executeReRequests()
      return resolve(res)
    })
    emit('admin-auth-by-auth-code', {
      authCode: sessionStorage.getItem('token'),
    })
  })
  return reAuthorization.reAuthorizationPromise
}
