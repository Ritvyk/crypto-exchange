const express = require("express")
const cors = require("cors")
const http = require("http")
const {Server} = require("socket.io")
const {socketServer,socketServerCORS} = require("./socketServer")

const app = express()
app.use(cors())

const PORT = 5500

const server = http.createServer(app)

const io = new Server(server,{
    cors: socketServerCORS
})

io.on("connection",(socket)=>{
    socketServer(io,socket)
})

server.listen(PORT)


