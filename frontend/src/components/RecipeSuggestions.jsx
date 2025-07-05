import React, { useState, useEffect } from 'react';
import { Search, Clock, Users, Star, ChefHat, Plus, X } from 'lucide-react';
import { getAllRecipes } from '../api';
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const RecipeSuggestions = ({ setCurrentView }) => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const handleChat = async () => {
    if (!input.trim()) return

    const userMsg = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    try {
      const res = await axios.post('http://localhost:5001/chat', {
        ingredients: input,
        username: 'vansh',
      })

      const botMsg = { sender: 'bot', text: res.data.response }
      setMessages(prev => [...prev, botMsg])
    } catch (error) {
      console.error("Chat error:", error.response?.data || error.message)
      const errorMsg = {
        sender: 'bot',
        text: 'Error generating response. Please try again.',
      }
      setMessages(prev => [...prev, errorMsg])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-peachy/20 to-sage/30 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-peachy to-sage mb-6">
            <div className="bg-cream rounded-full px-8">
              <h1 className="text-5xl font-bold py-7 bg-gradient-to-r from-cinnamon to-charcoal bg-clip-text text-transparent">
                Aapki Kitchen Sakhi
              </h1>
            </div>
          </div>
          <p className="text-xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
            Tell us what ingredients you have, and we'll suggest delicious recipes you can make right now
<<<<<<< HEAD
        </p>
      </div>

        {/* Ingredient Input Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-12 border border-peachy/20">
          <div className="flex items-center gap-3 mb-6">
            <ChefHat className="h-6 w-6 text-cinnamon" />
            <h3 className="text-2xl font-bold text-charcoal">What's in your kitchen?</h3>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter an ingredient (e.g., chicken, tomatoes, pasta)"
                className="w-full px-6 py-4 bg-cream/60 border border-peachy/30 rounded-full text-charcoal placeholder-charcoal/60 focus:outline-none focus:ring-2 focus:ring-cinnamon/50 focus:border-cinnamon transition-all"
            />
          </div>
          <button
            onClick={addIngredient}
            disabled={!currentIngredient.trim()}
              className="px-8 py-4 bg-gradient-to-r from-cinnamon to-sage text-white rounded-full font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
              Add
          </button>
        </div>

        {/* Ingredient Tags */}
        {ingredients.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-3">
            {ingredients.map((ingredient, index) => (
              <span
                key={index}
                    className="inline-flex items-center gap-2 bg-sage/20 text-sage border border-sage/30 px-4 py-2 rounded-full font-medium"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                      className="hover:text-rosy transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
              </div>
          </div>
        )}

        <button
          onClick={searchRecipes}
          disabled={ingredients.length === 0 || isSearching}
            className="w-full lg:w-auto px-10 py-4 bg-gradient-to-r from-peachy to-biscuit text-charcoal rounded-full font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          <Search className="h-5 w-5" />
          <span>{isSearching ? 'Searching...' : 'Find Recipes'}</span>
        </button>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-charcoal mb-2">
            Found {searchResults.length} recipe{searchResults.length !== 1 ? 's' : ''} for you!
          </h3>
              <p className="text-charcoal/70">Click any recipe to view full details</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.map((recipe) => (
                <div 
                  key={recipe._id || recipe.id} 
                  className="group bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-peachy/20 hover:border-cinnamon/40 hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  {/* Recipe Image */}
                  <div className="relative h-52 overflow-hidden">
                  {recipe.image ? (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                      <div className="w-full h-full bg-gradient-to-br from-peachy/30 to-sage/30 flex items-center justify-center">
                        <ChefHat className="h-16 w-16 text-cinnamon/40" />
                    </div>
                  )}
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-biscuit fill-current" />
                        <span className="text-sm font-medium">4.{Math.floor(Math.random() * 9) + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recipe Content */}
                <div className="p-6">
                    <h4 className="text-xl font-bold text-charcoal mb-3 group-hover:text-cinnamon transition-colors">
                      {recipe.title}
                    </h4>
                    <p className="text-charcoal/70 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {recipe.description}
                    </p>

                    {/* Recipe Meta */}
                    <div className="flex items-center justify-between text-sm text-charcoal/60 mb-4">
                      <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                        <span>{(recipe.prepTime || 0) + (recipe.cookTime || 0)}m</span>
                    </div>
                      <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                        <span>{recipe.servings}</span>
                    </div>
                      <div className="font-medium text-cinnamon">
                      {recipe.calories} cal
                    </div>
                  </div>

                    {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                          className="px-3 py-1 bg-cream/60 text-charcoal/70 rounded-full text-xs font-medium border border-peachy/20"
                      >
                        {tag}
                      </span>
                    ))}
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-medium text-cinnamon group-hover:text-sage transition-colors">
                        View Recipe →
                    </span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

        {/* Empty State */}
        {!isSearching && searchResults.length === 0 && ingredients.length > 0 && (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-12 border border-peachy/20 max-w-md mx-auto">
              <ChefHat className="h-16 w-16 text-cinnamon/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-charcoal mb-2">No recipes found</h3>
              <p className="text-charcoal/70">Try adding different ingredients or check your recipe collection</p>
            </div>
          </div>
        )}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-4xl max-h-[90vh] w-full overflow-y-auto border border-peachy/30">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-peachy/20 px-8 py-6 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-2xl font-bold text-charcoal">{selectedRecipe.title}</h2>
          <button
                onClick={() => setSelectedRecipe(null)}
                className="p-2 bg-cream/60 hover:bg-rosy/20 rounded-full transition-colors"
          >
                <X className="h-5 w-5 text-charcoal" />
          </button>
            </div>
            
            <div className="p-8">
              {/* Recipe Image */}
              {selectedRecipe.image && (
                <div className="mb-8">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              )}
              
              {/* Recipe Info Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-charcoal mb-4">Description</h3>
                  <p className="text-charcoal/70 leading-relaxed">{selectedRecipe.description}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-charcoal mb-4">Recipe Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-cinnamon" />
                      <span>Prep: {selectedRecipe.prepTime}min | Cook: {selectedRecipe.cookTime}min</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-cinnamon" />
                      <span>Serves {selectedRecipe.servings} people</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-cinnamon">{selectedRecipe.calories} calories per serving</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedRecipe.difficulty === 'Easy' ? 'bg-sage/20 text-sage' :
                        selectedRecipe.difficulty === 'Medium' ? 'bg-biscuit/20 text-cinnamon' :
                        'bg-rosy/20 text-rosy'
                      }`}>
                        {selectedRecipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Ingredients */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-charcoal mb-4">Ingredients</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-3 bg-cream/40 p-3 rounded-xl border border-peachy/20">
                      <div className="w-2 h-2 bg-cinnamon rounded-full flex-shrink-0"></div>
                      <span className="capitalize">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Instructions */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-charcoal mb-4">Instructions</h3>
                <div className="space-y-4">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="bg-gradient-to-r from-cinnamon to-sage text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                        {index + 1}
                      </div>
                      <p className="text-charcoal/80 leading-relaxed">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <h3 className="text-lg font-bold text-charcoal mb-3">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedRecipe.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-sage/20 text-sage border border-sage/30 px-4 py-2 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
=======
          </p>
        </div>
<div className="h-[400px] overflow-y-auto flex flex-col gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] px-4 py-3 rounded-xl ${
              msg.sender === 'user'
                ? 'self-end bg-orange-500 text-white'
                : 'self-start bg-gray-100 text-gray-900'
            }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
      </div>

      {/* input logic hi kehde */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter ingredients like potato, rice..."
          className="flex-1 px-4 py-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleChat()}
        />
        <button
          onClick={handleChat}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg transition"
        >
          Ask
        </button>
      </div>
      </div>
>>>>>>> 09c14f0e0dd561fbda19c93969f4bfde42b882e1
    </div>
  );
};

export default RecipeSuggestions;