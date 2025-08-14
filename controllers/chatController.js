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
    .populate('participants', 'name avatar email')
    .sort({ updatedAt: -1 });

    res.json(chats);
});

// @desc    Create or get a chat between two users
// @route   POST /api/chats
// @access  Private
const createOrGetChat = asyncHandler(async (req, res) => {
    const { participantId } = req.body;
    if (!participantId) {
        res.status(400);
        throw new Error('Participant ID is required');
    }
    let chat = await Chat.findOne({
        participants: { $all: [req.user._id, participantId], $size: 2 }
    }).populate('participants', 'name avatar email');
    if (!chat) {
        chat = await Chat.create({ participants: [req.user._id, participantId], messages: [] });
        await chat.populate('participants', 'name avatar email');
    }
    res.status(201).json(chat);
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

    res.status(201).json(chat.messages[chat.messages.length - 1]);
});

module.exports = {
    getConversations,
    createOrGetChat,
    sendMessage
};