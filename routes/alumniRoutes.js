
const express = require('express');
const router = express.Router();
const { getAlumni, getAlumniById } = require('../controllers/alumniController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAlumni);
router.get('/:id', protect, getAlumniById);

module.exports = router;