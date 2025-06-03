const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const {Server} = require('socket.io');

const io = new Server(8000);

io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Client joined room: ${roomId}`);
    });

    socket.on('sendMessage', (data) => {
        io.to(data.roomId).emit('receiveMessage', data);
        console.log(`Message sent to room ${data.roomId}:`, data.message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
})


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/StreamLink')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use("/api/auth",authRoutes);
app.use("/api/room",roomRoutes);
