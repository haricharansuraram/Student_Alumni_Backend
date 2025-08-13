// routes/alumniRoutes.js
const express = require('express');
const router = express.Router();
const { getAlumni } = require('../controllers/alumniController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAlumni);

module.exports = router;
