const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Alumni = require('../models/Alumni');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, batch, profession, location, phone } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    batch,
    profession,
    location,
    phone,
  });

  if (user) {
    // Automatically create a profile document for the new user
    await Profile.create({
      user: user._id,
      firstName: name.split(' ')[0] || '',
      lastName: name.split(' ')[1] || '',
      email: user.email,
      role: user.role,
      batch: user.batch || '',
      profession: user.profession || '',
      location: user.location || '',
      phone: user.phone || '',
      bio: '',
      skills: [],
      linkedin: '',
      github: '',
      portfolio: '',
      growthGoals: [],
    });

    if (user.role.toLowerCase() === 'alumni') {
      await Alumni.create({
        user: user._id,
        jobTitle: profession,
        location,
        batch,
        industry: 'N/A'
      });
    }

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        batch: user.batch || '',
        profession: user.profession || '',
        location: user.location || '',
        phone: user.phone || '',
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        batch: user.batch || '',
        profession: user.profession || '',
        location: user.location || '',
        phone: user.phone || '',
      }
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

module.exports = {
  registerUser,
  loginUser,
};