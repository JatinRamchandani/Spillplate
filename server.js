const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket)=>{
    console.log('User-Online')
    socket.on('canvas-data', (data)=>{
        socket.broadcast.emit('canvas-data', data)
    })
})


if(process.env.NODE_ENV == "production"){
    app.use(express.static("spillplate/build"))
      
}

var server_port = process.env.YOUR_PORT|| process.env.PORT|| 8080;
server.listen(server_port, ()=>{
    console.log("Started on : "+server_port);
})