const mongoose = require('mongoose');

const alumniSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, default: 'Amazon' },
  jobTitle: { type: String, default: 'Developer' },
  location: { type: String, default: 'Hyderabad,India.' },
  Email:{ type: String, default: 'haricharan@gmail.com'}  , // New
  qualification: { type: String, default: 'B Tech' },
  phone: { type: String, default: '' },
  education: { type: String, default: 'Computer Science' },         // New
  degree: { type: String, default: 'B Tech' },            // New
  experience: { type: String, default: '5 years' },        // New     // New
  passedOut: { type: String, default: '2022' },         // New
  skills: { type: [String], default: ['react','java','sql'] },          // New             // New (for profile image URL)
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);