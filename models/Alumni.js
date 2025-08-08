// models/Alumni.js
const mongoose = require('mongoose');

const alumniSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    jobTitle: String,
    company: String,
    industry: String,
    location: String,
    batch: {
        type: Number,
        required: [true, 'Please add a batch year']
    },
    isMentor: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Alumni', alumniSchema);
