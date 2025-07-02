import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RecipeSuggestions from './components/RecipeSuggestions';
import MealPlanner from './components/MealPlanner';
import RecipeManager from './components/RecipeManager';
import ShoppingList from './components/ShoppingList';
import Auth from './components/Auth';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false
  });

  const [mealPlans, setMealPlans] = useState([]);
  

  const handleLogin = (user) => {
    setAuthState({
      user: { id: '1', ...user },
      isAuthenticated: true
    });
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });
    setCurrentView('auth');
  };

  if (!authState.isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderCurrentView = () => {
  switch (currentView) {
    case 'dashboard':
      return <Dashboard setCurrentView={setCurrentView} user={authState.user} />;
    case 'recipes':
      return <RecipeSuggestions setCurrentView={setCurrentView} />;
    case 'planner':
      // CHANGE THIS LINE ↓
      return <MealPlanner mealPlans={mealPlans} setMealPlans={setMealPlans} />;
    case 'manager':
      return <RecipeManager />;
    case 'shopping':
      // CHANGE THIS LINE ↓
      return <ShoppingList mealPlans={mealPlans} />;
    default:
      return <Dashboard setCurrentView={setCurrentView} user={authState.user} />;
  }
};

  return (
    <div className="min-h-screen bg-base">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        isAuthenticated={authState.isAuthenticated}
        user={authState.user}
        onLogout={handleLogout}
      />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;