const express = require('express');
const router = express.Router();
const { createRoom, joinRoom } = require("../Controllers/roomController");

router.post('/createRoom', createRoom);
router.post('/joinRoom', joinRoom);

module.exports = router;
