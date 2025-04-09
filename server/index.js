import express from 'express';
// import dotenv from 'dotenv/config';
import mongoDBConnect from './mongoDB/connection.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.js';
import chatRoutes from './routes/chat.js';
import messageRoutes from './routes/message.js';
import * as Server from 'socket.io';
import dotenv from 'dotenv';
import http from 'http';
dotenv.config();
const app = express();
const corsConfig = {
  origin: process.env.BASE_URL,
  credentials: true,
};
const PORT=process.env.PORT || 8000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});
app.use('/', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

mongoose.set('strictQuery', false);
mongoDBConnect();


const server = http.createServer(app);
const io = new Server.Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.BASE_URL || "http://localhost:3000",
  },
});
io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData.id);
    socket.emit('connected');
  });
  socket.on('join room', (room) => {
    socket.join(room);
  });
  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieve) => {
    var chat = newMessageRecieve.chatId;
    if (!chat.users) {
      console.log('chats.users is not defined');
      return;
    }
  
    chat.users.forEach((user) => {
      if (user._id.toString() === newMessageRecieve.sender._id.toString()) return;
      console.log(`📤 Sending message to ${user._id}`);
      socket.in(user._id).emit('message recieved', newMessageRecieve);
    });
  });
  
});
server.listen(PORT, () => {
  console.log(`✅ Server Listening at PORT - ${PORT}`);
});