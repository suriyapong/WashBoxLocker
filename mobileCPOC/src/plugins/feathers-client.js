import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'



//const url = process.env.VUE_APP_SERVER_API
const url = "http://192.168.1.100:3030/"
//const url = "http://localhost:3030/"
//Console.log(url)
const socket = io(url, { transports: ['websocket'] })


const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({
    storage: window.localStorage
  }))


export default feathersClient