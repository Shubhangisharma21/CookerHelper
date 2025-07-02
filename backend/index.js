const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const app = express();
const PORT = 5000;
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const auth = require('./middleware/auth');

// Middleware (put this BEFORE your routes!)
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/cookerhelper'; // This matches your running MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running and connected to MongoDB!');
});

// Create a new recipe (protected route)
app.post('/recipes', auth, async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      userId: req.user.userId
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user's recipes (protected route)
app.get('/recipes/my', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.userId });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all recipes (public route)
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register endpoint
app.post('/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login endpoint
app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    
    // Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      token, 
      user: { 
        name: user.name, 
        email: user.email, 
        id: user._id 
      } 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user profile (protected route)
app.get('/users/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a recipe (protected route)
app.put('/recipes/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a recipe (protected route)
app.delete('/recipes/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});