const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: { 
            type: String,
            required: true, 
            unique: true 
          },
  hostId: { 
            type: String, 
            required: true 
        },
  roomName: {
            type: String 
        },
  createdAt: { 
            type: Date,
            default: Date.now 
        },
  viewers: { 
            type: [String], 
            default: [] 
        },
  active: { 
            type: Boolean, 
            default: true 
        }
});

module.exports = mongoose.model('Room', roomSchema);
