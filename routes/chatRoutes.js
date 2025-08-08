// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { getConversations, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getConversations);
router.post('/:chatId/messages', protect, sendMessage);

module.exports = router;
