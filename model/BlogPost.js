const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  videoUrl: { type: String },
  date: { type: Date, default: Date.now },
  likes: { type: [String], default: [] }, // Array of user IDs who liked the post
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
