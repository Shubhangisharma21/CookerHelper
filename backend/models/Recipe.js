const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ingredients: [String],
  instructions: [String],
  prepTime: Number,
  cookTime: Number,
  servings: Number,
  calories: Number,
  image: String,
  tags: [String],
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;