const express = require('express');
const router = require('./router')
const socketio = require('socket.io');
const app = express();
const http = require('http')

const port = process.env.PORT || 4000;

const server = http.createServer(app);

const io =  socketio(server);

io.on('connection', (socket)=>{
    socket.on('join', )
})


app.use(router)
server.listen(port, ()=>{
    console.log(`Server started ${port}`)
})