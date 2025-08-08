// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Links this profile to a user
        unique: true
    },
    bio: {
        type: String,
        trim: true,
        default: ''
    },
    skills: {
        type: [String], // Array of strings
        default: []
    },
    linkedin: {
        type: String,
        default: ''
    },
    github: {
        type: String,
        default: ''
    },
    portfolio: {
        type: String,
        default: ''
    },
    growthGoals: [{
        text: String,
        completed: { type: Boolean, default: false }
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Profile', profileSchema);