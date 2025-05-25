const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
<<<<<<< HEAD
=======
const roomRoutes = require('./routes/roomRoutes');
>>>>>>> 092613f (added createRoom and joinRoom)

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


<<<<<<< HEAD
app.use("/api/auth",authRoutes)
=======
app.use("/api/auth",authRoutes);
app.use("/api/room",roomRoutes);
>>>>>>> 092613f (added createRoom and joinRoom)

