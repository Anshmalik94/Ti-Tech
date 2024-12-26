const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./model/User');
const Contact = require('./model/Contact'); // Import the Contact model
const BlogPost = require('./model/BlogPost'); // Import the BlogPost model

// Initialize express
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection (replace with your MongoDB URI)
const dbURI = 'mongodb://localhost:27017/registrationform'; // Make sure this matches your setup
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Registration route
app.post('/registration', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({ message: 'Login successful!', user: { username: user.username, email: user.email } });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// Contact form submission route
app.post('/submit-form', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error submitting form:', err);
    res.status(500).json({ message: 'Error submitting form', error: err.message });
  }
});

// Blog routes for news and article section
// Fetch all blog posts
app.get('/api/blogPosts', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog posts', error: err.message });
  }
});

// Create a new blog post
app.post('/api/createPost', async (req, res) => {
  const { title, content, videoUrl } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const newPost = new BlogPost({
      title,
      content,
      videoUrl,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
});

// Handle like functionality (one like per user)
app.post('/api/likePost', async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user has already liked the post
    const userHasLiked = post.likes.includes(userId);
    if (userHasLiked) {
      return res.status(400).json({ message: 'User has already liked this post' });
    }

    // Add userId to likes array and increment like count
    post.likes.push(userId);
    await post.save();
    
    res.status(200).json({ likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: 'Error liking post', error: err.message });
  }
});

// Your server port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
