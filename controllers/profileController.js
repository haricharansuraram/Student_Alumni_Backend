const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');

const getProfile = asyncHandler(async (req, res) => {
    const userId = req.params.id || req.user.id;
    const profile = await Profile.findOne({ user: userId }).populate('user', 'name email role');

    if (!profile) {
        res.status(404);
        throw new Error('Profile not found');
    }

    res.json(profile);
});

const createOrUpdateProfile = asyncHandler(async (req, res) => {
    const { bio, skills, linkedin, github, portfolio } = req.body;
    const profileFields = {
        user: req.user._id,
        bio,
        skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
        linkedin,
        github,
        portfolio
    };

    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
        profile = await Profile.findOneAndUpdate(
            { user: req.user._id },
            { $set: profileFields },
            { new: true }
        );
        res.json(profile);
    } else {
        profile = new Profile(profileFields);
        await profile.save();
        res.status(201).json(profile);
    }
});

module.exports = { getProfile, createOrUpdateProfile };
