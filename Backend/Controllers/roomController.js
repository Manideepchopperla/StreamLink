const Room = require('../models/Room');
const { v4: uuidv4 } = require('uuid');

exports.createRoom = async (req, res) => {
  const { hostId, roomName } = req.body;

  if (!hostId || !roomName) {
    return res.status(400).json({ message: "hostId and roomName are required" });
  }

  const roomId = "room_" + uuidv4().slice(0, 6);
  console.log(roomId);

  try {
    const newRoom = new Room({
      roomId,
      hostId,
      roomName,
      active: true
    });

    await newRoom.save(); 

    res.status(201).json({
      roomId,
      streamLink: `http://localhost:3000/room/${roomId}`,
      createdAt: newRoom.createdAt
    });
  } catch (err) {
    console.error("Error creating room:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.joinRoom = async (req, res) => {
  const { roomId, viewerName } = req.body;

  if (!roomId || !viewerName) {
    return res.status(400).json({ message: "roomId and viewerName are required" });
  }

  try {
    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (!room.active) {
      return res.status(403).json({ message: "Room is inactive" });
    }


    if (!room.viewers.includes(viewerName)) {
      room.viewers.push(viewerName);
      await room.save();
    }

    res.status(200).json({
      message: "Joined room successfully",
      roomId: room.roomId,
      viewerCount: room.viewers.length
    });
  } catch (err) {
    console.error("Error joining room:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
