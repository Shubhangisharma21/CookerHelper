import React from 'react';
import { ChefHat, BookOpen, Calendar, ShoppingCart, TrendingUp, Clock, Users, Star } from 'lucide-react';

const Dashboard = ({ setCurrentView, user }) => {
  const quickActions = [
    {
      id: 'recipes',
      title: 'Find Recipes',
      description: 'Discover recipes based on your ingredients',
      icon: BookOpen,
      color: '#FFB085',
      bgColor: 'rgba(255, 176, 133, 0.1)'
    },
    {
      id: 'planner',
      title: 'Plan Meals',
      description: 'Organize your weekly meal schedule',
      icon: Calendar,
      color: '#8EB695',
      bgColor: 'rgba(142, 182, 149, 0.1)'
    },
    {
      id: 'manager',
      title: 'My Recipes',
      description: 'Manage your personal recipe collection',
      icon: ChefHat,
      color: '#EF9A9A',
      bgColor: 'rgba(239, 154, 154, 0.1)'
    },
    {
      id: 'shopping',
      title: 'Shopping List',
      description: 'Auto-generated from your meal plans',
      icon: ShoppingCart,
      color: '#FFD59E',
      bgColor: 'rgba(255, 213, 158, 0.2)'
    }
  ];

  const stats = [
    { label: 'Recipes Saved', value: '24', icon: BookOpen, color: '#FFB085' },
    { label: 'Meals Planned', value: '12', icon: Calendar, color: '#8EB695' },
    { label: 'Shopping Items', value: '8', icon: ShoppingCart, color: '#EF9A9A' },
    { label: 'Cook Time Saved', value: '3.5h', icon: Clock, color: '#FFD59E' }
  ];

  return (
    <div className="min-h-screen" 
         style={{
           background: 'linear-gradient(135deg, #FFF2E1 0%, #FDFDFC 50%, #D9EAD3 100%)',
           backgroundAttachment: 'fixed'
         }}>
      
      {/* Hero Section */}
      <div className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-black mb-6 tracking-tight" style={{color: '#2C3A47'}}>
              Welcome back, <span style={{color: '#FFB085'}}>{user?.name}</span>
            </h1>
            <p className="text-2xl font-medium max-w-3xl mx-auto leading-relaxed" style={{color: '#A0522D'}}>
              Your culinary command center is ready. Let's create something amazing today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} 
                   className="rounded-3xl p-8 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                   style={{
                     backgroundColor: 'rgba(253, 253, 252, 0.9)',
                     borderColor: `${stat.color}40`
                   }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                       style={{backgroundColor: `${stat.color}20`}}>
                    <stat.icon className="h-6 w-6" style={{color: stat.color}} />
                  </div>
                </div>
                <div className="text-3xl font-black mb-2" style={{color: '#2C3A47'}}>
                  {stat.value}
                </div>
                <div className="text-sm font-semibold" style={{color: '#A0522D'}}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-16">
            <h2 className="text-4xl font-black text-center mb-12" style={{color: '#2C3A47'}}>
              What would you like to do today?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => setCurrentView(action.id)}
                  className="group rounded-3xl p-8 backdrop-blur-sm border-2 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 text-left"
                  style={{
                    backgroundColor: 'rgba(253, 253, 252, 0.9)',
                    borderColor: `${action.color}40`
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.borderColor = action.color;
                    e.currentTarget.style.backgroundColor = action.bgColor;
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.borderColor = `${action.color}40`;
                    e.currentTarget.style.backgroundColor = 'rgba(253, 253, 252, 0.9)';
                  }}
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                       style={{backgroundColor: action.bgColor}}>
                    <action.icon className="h-8 w-8" style={{color: action.color}} />
                  </div>
                  
                  <h3 className="text-2xl font-black mb-3" style={{color: '#2C3A47'}}>
                    {action.title}
                  </h3>
                  
                  <p className="text-lg leading-relaxed" style={{color: '#A0522D'}}>
                    {action.description}
                  </p>

                  <div className="mt-6 flex items-center text-lg font-bold group-hover:translate-x-2 transition-transform duration-300"
                       style={{color: action.color}}>
                    Get Started →
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Section */}
          <div className="rounded-3xl p-12 backdrop-blur-sm border-2 shadow-2xl"
               style={{
                 backgroundColor: 'rgba(253, 253, 252, 0.9)',
                 borderColor: 'rgba(255, 176, 133, 0.3)',
                 background: 'linear-gradient(135deg, rgba(255, 176, 133, 0.1) 0%, rgba(142, 182, 149, 0.1) 100%)'
               }}>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                     style={{
                       backgroundColor: '#FFB085',
                       background: 'linear-gradient(135deg, #FFB085 0%, #8EB695 100%)'
                     }}>
                  <TrendingUp className="h-10 w-10" style={{color: '#2C3A47'}} />
                </div>
              </div>
              
              <h2 className="text-4xl font-black mb-6" style={{color: '#2C3A47'}}>
                Your Cooking Journey
              </h2>
              
              <p className="text-xl leading-relaxed max-w-2xl mx-auto mb-8" style={{color: '#A0522D'}}>
                Track your progress, discover new flavors, and build your culinary expertise 
                with our intelligent kitchen management system.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                       style={{backgroundColor: 'rgba(255, 176, 133, 0.2)'}}>
                    <Star className="h-8 w-8" style={{color: '#FFB085'}} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{color: '#2C3A47'}}>Expert Level</h3>
                  <p style={{color: '#A0522D'}}>Professional recipes at your fingertips</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                       style={{backgroundColor: 'rgba(142, 182, 149, 0.2)'}}>
                    <Users className="h-8 w-8" style={{color: '#8EB695'}} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{color: '#2C3A47'}}>Community</h3>
                  <p style={{color: '#A0522D'}}>Join thousands of passionate cooks</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                       style={{backgroundColor: 'rgba(239, 154, 154, 0.2)'}}>
                    <Clock className="h-8 w-8" style={{color: '#EF9A9A'}} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{color: '#2C3A47'}}>Time Saved</h3>
                  <p style={{color: '#A0522D'}}>Efficient planning saves hours weekly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;