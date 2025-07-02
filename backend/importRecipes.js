const mongoose = require('mongoose');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Recipe = require('./models/Recipe');

// 1. Connect to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/cookerhelper';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Fetch recipes from TheMealDB
async function fetchRecipes() {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; // gets all meals
  const res = await fetch(url);
  const data = await res.json();
  return data.meals || [];
}

// 3. Convert TheMealDB recipe to your Recipe model format
function convertMealToRecipe(meal) {
  return {
    title: meal.strMeal,
    description: meal.strInstructions,
    ingredients: Array.from({length: 20}, (_, i) => meal[`strIngredient${i+1}`])
      .filter(Boolean)
      .map(ing => ing.trim())
      .filter(ing => ing.length > 0),
    instructions: meal.strInstructions ? meal.strInstructions.split('\n').filter(Boolean) : [],
    prepTime: 0, // TheMealDB doesn't provide this
    cookTime: 0, // TheMealDB doesn't provide this
    servings: 1, // TheMealDB doesn't provide this
    calories: 0, // TheMealDB doesn't provide this
    image: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(',').map(tag => tag.trim()) : [],
    difficulty: 'Easy' // TheMealDB doesn't provide this
  };
}

// 4. Save recipes to MongoDB
async function importRecipes() {
  const meals = await fetchRecipes();
  const recipes = meals.map(convertMealToRecipe);

  for (const recipeData of recipes) {
    try {
      // Avoid duplicates by title
      const exists = await Recipe.findOne({ title: recipeData.title });
      if (!exists) {
        const recipe = new Recipe(recipeData);
        await recipe.save();
        console.log(`Saved: ${recipe.title}`);
      } else {
        console.log(`Skipped (already exists): ${recipeData.title}`);
      }
    } catch (err) {
      console.error(`Error saving recipe: ${recipeData.title}`, err.message);
    }
  }
  mongoose.disconnect();
}

importRecipes();