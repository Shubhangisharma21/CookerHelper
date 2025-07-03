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
    </div>
  );
};

export default RecipeSuggestions;