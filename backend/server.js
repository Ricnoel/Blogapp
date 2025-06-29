const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Post Schema and Model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model('Post', postSchema);

// Root Route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API');
});

// CRUD Routes

// Create a new post
app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: 'Error creating post', error: err });
  }
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err });
  }
});

// Edit a post
app.put('/api/posts/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: 'Error updating post', error: err });
  }
});

// Delete a post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id; // Get the post ID from the URL params
    const deletedPost = await Post.findByIdAndDelete(postId); // Delete the post from MongoDB

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' }); // If no post was found to delete
    }

    res.status(200).json({ message: 'Post deleted successfully' }); // Successfully deleted
  } catch (err) {
    res.status(400).json({ message: 'Error deleting post', error: err }); // Handle errors
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
