// controllers/chatController.js
const asyncHandler = require('express-async-handler');
const Chat = require('../models/Chat');
const User = require('../models/User');

// @desc    Get user's conversations
// @route   GET /api/chats
// @access  Private
const getConversations = asyncHandler(async (req, res) => {
    const chats = await Chat.find({
        participants: req.user._id
    })
    .populate('participants', 'name email') // Populate participant details
    .sort({ updatedAt: -1 }); // Sort by most recent message

    res.json(chats);
});

// @desc    Send a message
// @route   POST /api/chats/:chatId/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const { text } = req.body;

    if (!text) {
        res.status(400);
        throw new Error('Message text is required');
    }

    let chat = await Chat.findById(chatId);

    if (!chat) {
        res.status(404);
        throw new Error('Chat not found');
    }

    // Check if the user is a participant
    if (!chat.participants.includes(req.user._id)) {
        res.status(403);
        throw new Error('User is not a participant in this chat');
    }

    const newMessage = {
        sender: req.user._id,
        text: text
    };

    chat.messages.push(newMessage);
    await chat.save();

    res.status(201).json(chat.messages[chat.messages.length - 1]); // Return the new message
});

module.exports = {
    getConversations,
    sendMessage
};
