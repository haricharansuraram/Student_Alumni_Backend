const mongoose = require('mongoose');

const alumniSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  batch: { type: String, default: '' },
  jobTitle: { type: String, default: '' },
  location: { type: String, default: '' },
  phone: { type: String, default: '' },
  industry: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);