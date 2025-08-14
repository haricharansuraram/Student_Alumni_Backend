const express = require('express');
const router = express.Router();
const { getConversations, createOrGetChat, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getConversations);
router.post('/', protect, createOrGetChat);
router.post('/:chatId/messages', protect, sendMessage);

module.exports = router;