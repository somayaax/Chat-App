const express = require('express');
const app = express();
require("dotenv").config();
const http = require('http');
const routes = require('./routes');
const server = http.createServer(app);
const mongoose = require('mongoose');
const mongourl = process.env.MONGO_URL;
mongoose
  .connect(mongourl)
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(routes);
app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500;
    return res.status(error.statusCode).json({ error: error.toString() });
  });

const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        socket.broadcast.emit('new-msg', data)
    })
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});