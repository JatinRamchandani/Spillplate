const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path')

io.on('connection', (socket)=>{
    console.log('User-Online')
    socket.on('canvas-data', (data)=>{
        socket.broadcast.emit('canvas-data', data)
    })
})


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'spillplate/build', 'index.html'));
})


if(process.env.NODE_ENV == "production"){
    app.use(express.static("spillplate/build"))
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'spillplate/build', 'index.html'));
      });
}

var server_port = process.env.YOUR_PORT|| process.env.PORT|| 8080;
server.listen(server_port, ()=>{
    console.log("Started on : "+server_port);
})