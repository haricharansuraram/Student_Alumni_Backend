// controllers/alumniController.js
const asyncHandler = require('express-async-handler');
const Alumni = require('../models/Alumni');
const User = require('../models/User');

// @desc    Get all alumni with filtering
// @route   GET /api/alumni
// @access  Private
const getAlumni = asyncHandler(async (req, res) => {
    const { batch, industry, search } = req.query;
    const query = {};

    // Build the query object based on filters
    if (batch) query.batch = batch;
    if (industry) query.industry = industry;

    const alumni = await Alumni.find(query).populate('user', 'name email');

    // Add search functionality
    let filteredAlumni = alumni;
    if (search) {
        const lowerSearch = search.toLowerCase();
        filteredAlumni = alumni.filter(alum =>
            alum.user.name.toLowerCase().includes(lowerSearch) ||
            (alum.jobTitle && alum.jobTitle.toLowerCase().includes(lowerSearch)) ||
            (alum.company && alum.company.toLowerCase().includes(lowerSearch))
        );
    }

    res.json(filteredAlumni);
});

module.exports = {
    getAlumni
};