const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    bio: {
        type: String,
        trim: true,
        default: ''
    },
    skills: {
        type: [String],
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
    }],
    // Add these fields for later editing, but make them optional
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    role: { type: String, default: '' },
    batch: { type: String, default: '' },
    profession: { type: String, default: '' },
    location: { type: String, default: '' },
    phone: { type: String, default: '' }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Profile', profileSchema);