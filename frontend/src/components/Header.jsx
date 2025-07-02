import React from 'react';
import { Utensils, User, LogOut, Menu } from 'lucide-react';

const Header = ({
  currentView,
  setCurrentView,
  isAuthenticated,
  user,
  onLogout
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'recipes', label: 'Recipe Finder' },
    { id: 'planner', label: 'Meal Planner' },
    { id: 'manager', label: 'My Recipes' },
    { id: 'shopping', label: 'Shopping List' },
  ];

  return (
    <header className="backdrop-blur-md border-b-2 sticky top-0 z-50"
            style={{
              backgroundColor: 'rgba(253, 253, 252, 0.95)',
              borderColor: 'rgba(255, 176, 133, 0.2)'
            }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl shadow-lg border-2 flex items-center justify-center"
                   style={{
                     backgroundColor: '#FFB085',
                     borderColor: '#A0522D',
                     background: 'linear-gradient(135deg, #FFB085 0%, #FFD59E 100%)'
                   }}>
                <Utensils className="h-6 w-6" style={{color: '#2C3A47'}} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight" style={{color: '#2C3A47'}}>
                Cooker Helper
              </h1>
              <p className="text-sm font-medium" style={{color: '#A0522D'}}>
                Professional Kitchen Management
              </p>
            </div>
          </div>

          {/* Navigation */}
          {isAuthenticated && (
            <nav className="hidden lg:flex space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 ${
                    currentView === item.id
                      ? 'shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: currentView === item.id ? '#FFB085' : 'transparent',
                    color: currentView === item.id ? '#2C3A47' : '#A0522D',
                    border: currentView === item.id ? '2px solid #FFB085' : '2px solid transparent'
                  }}
                  onMouseOver={e => {
                    if (currentView !== item.id) {
                      e.target.style.backgroundColor = 'rgba(255, 176, 133, 0.1)';
                      e.target.style.borderColor = 'rgba(255, 176, 133, 0.3)';
                    }
                  }}
                  onMouseOut={e => {
                    if (currentView !== item.id) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.borderColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4 px-4 py-2 rounded-xl border-2"
                   style={{
                     backgroundColor: 'rgba(142, 182, 149, 0.1)',
                     borderColor: 'rgba(142, 182, 149, 0.3)'
                   }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                     style={{backgroundColor: '#8EB695'}}>
                  <User className="h-5 w-5" style={{color: '#2C3A47'}} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{color: '#2C3A47'}}>
                    {user?.name}
                  </p>
                  <p className="text-xs" style={{color: '#A0522D'}}>
                    Home Chef
                  </p>
                </div>
              </div>
              
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-300 border-2 hover:shadow-lg transform hover:-translate-y-0.5"
                style={{
                  color: '#EF9A9A',
                  borderColor: 'rgba(239, 154, 154, 0.3)',
                  backgroundColor: 'rgba(239, 154, 154, 0.1)'
                }}
                onMouseOver={e => {
                  e.target.style.backgroundColor = '#EF9A9A';
                  e.target.style.color = '#2C3A47';
                  e.target.style.borderColor = '#EF9A9A';
                }}
                onMouseOut={e => {
                  e.target.style.backgroundColor = 'rgba(239, 154, 154, 0.1)';
                  e.target.style.color = '#EF9A9A';
                  e.target.style.borderColor = 'rgba(239, 154, 154, 0.3)';
                }}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentView('auth')}
              className="px-6 py-3 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2"
              style={{
                backgroundColor: '#FFB085',
                color: '#2C3A47',
                borderColor: '#FFB085'
              }}
              onMouseOver={e => {
                e.target.style.backgroundColor = '#FF9A65';
                e.target.style.borderColor = '#FF9A65';
              }}
              onMouseOut={e => {
                e.target.style.backgroundColor = '#FFB085';
                e.target.style.borderColor = '#FFB085';
              }}
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && (
          <div className="lg:hidden py-4 border-t-2" style={{borderColor: 'rgba(255, 176, 133, 0.1)'}}>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 border-2 ${
                    currentView === item.id ? 'shadow-md' : ''
                  }`}
                  style={{
                    backgroundColor: currentView === item.id ? '#FFB085' : 'rgba(255, 176, 133, 0.1)',
                    color: currentView === item.id ? '#2C3A47' : '#A0522D',
                    borderColor: currentView === item.id ? '#FFB085' : 'rgba(255, 176, 133, 0.3)'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;