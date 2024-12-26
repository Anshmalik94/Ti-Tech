const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Trim whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Trim whitespace
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the created date
  },
});

module.exports = mongoose.model('User', userSchema);
