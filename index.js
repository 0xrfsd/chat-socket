import http from 'http';
import express from 'express';
import logger from 'morgan';
import socketio from "socket.io";

// socket configuration
import WebSockets from "./utils/WebSockets.js";


// mongo config
import './config/mongo.js';

// routes
import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import chatRoomRouter from './routes/chatRoom.js';
import deleteRouter from './routes/delete.js';

// middlewares
import { decode } from './middlewares/jwt.js';

// server registering
const app = express();

// Get Port from environment and store in Express
const port = process.env.PORT || 3000;
app.set("port", port);

// server config
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// server routes
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

// server 404 handler
app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});

// create HTTP server
const server = http.createServer(app); 

// Create socket connection //
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection)

// listen on provided port, on all network interfaces
server.listen(port);

// event listener for HTTP server "listening" event
server.on("listening", () => {
    console.log(`Listeing on port:: http://localhost:${port}/`)
});