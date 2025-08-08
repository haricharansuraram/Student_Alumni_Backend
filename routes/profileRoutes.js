// routes/profileRoutes.js
const router = require('express').Router();
const { getProfile, createOrUpdateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

// Get a specific user's profile by ID
router.get('/:id', protect, getProfile);

// Create or update the authenticated user's profile
router.post('/', protect, createOrUpdateProfile);

module.exports = router;
