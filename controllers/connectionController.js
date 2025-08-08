// controllers/connectionController.js
const asyncHandler = require('express-async-handler');
const Connection = require('../models/Connection');
const User = require('../models/User');

// @desc    Send a connection request
// @route   POST /api/connections/request
// @access  Private
const sendConnectionRequest = asyncHandler(async (req, res) => {
    const { receiverId } = req.body;

    // A check to prevent self-connection
    if (req.user._id.toString() === receiverId) {
        res.status(400);
        throw new Error('Cannot send a connection request to yourself');
    }

    // Check if a request already exists
    const existingRequest = await Connection.findOne({
        $or: [
            { sender: req.user._id, receiver: receiverId },
            { sender: receiverId, receiver: req.user._id }
        ]
    });

    if (existingRequest) {
        res.status(400);
        throw new Error('Connection request already exists');
    }

    const newConnection = await Connection.create({
        sender: req.user._id,
        receiver: receiverId,
        status: 'pending'
    });

    res.status(201).json({ message: 'Connection request sent successfully', connection: newConnection });
});

// @desc    Get user's connections (pending, accepted)
// @route   GET /api/connections
// @access  Private
const getConnections = asyncHandler(async (req, res) => {
    const connections = await Connection.find({
        $or: [
            { sender: req.user._id },
            { receiver: req.user._id }
        ]
    }).populate('sender receiver', 'name email role'); // Populate user details

    res.json(connections);
});

module.exports = {
    sendConnectionRequest,
    getConnections
};
