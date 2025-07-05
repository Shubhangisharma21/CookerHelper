import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, ChefHat, Utensils } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState('welcome');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === 'signin') {
        const { loginUser } = await import('../api.js');
        const response = await loginUser({
          email: formData.email,
          password: formData.password
        });
        
        localStorage.setItem('token', response.token);
        onLogin(response.user);
      } else if (authMode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          setIsLoading(false);
          return;
        }
        
        const { registerUser } = await import('../api.js');
        await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        
        alert('Registration successful! Please sign in.');
        setAuthMode('signin');
        resetForm();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const goBack = () => {
    setAuthMode('welcome');
    resetForm();
  };

  if (authMode === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center px-8" 
           style={{
             background: 'linear-gradient(135deg, #FFF2E1 0%, #FDFDFC 50%, #FFD59E 100%)',
             backgroundAttachment: 'fixed'
           }}>
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Brand & Description */}
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start items-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl shadow-2xl border-2 flex items-center justify-center"
                     style={{
                       backgroundColor: '#FFB085',
                       borderColor: '#A0522D',
                       background: 'linear-gradient(135deg, #FFB085 0%, #FFD59E 100%)'
                     }}>
                  <Utensils className="h-10 w-10" style={{color: '#2C3A47'}} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                     style={{backgroundColor: '#8EB695', color: '#2C3A47'}}>
                  •
                </div>
              </div>
              <div className="ml-6">
                <h1 className="text-5xl lg:text-6xl font-black tracking-tight" 
                    style={{color: '#2C3A47'}}>
                  Cooker Helper
                </h1>
                <p className="text-lg font-medium mt-1" style={{color: '#A0522D'}}>
                  Professional Kitchen Management
                </p>
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight" 
                  style={{color: '#2C3A47'}}>
                Transform Your Kitchen Into a<br />
                <span style={{color: '#FFB085'}}>Culinary Command Center</span>
              </h2>
              
              <p className="text-xl leading-relaxed" style={{color: '#A0522D'}}>
                Streamline meal planning, organize recipes, and automate shopping lists. 
                Built for home chefs who demand excellence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 rounded-xl border-2" 
                     style={{backgroundColor: 'rgba(255, 213, 158, 0.3)', borderColor: '#FFD59E'}}>
                  <div className="text-2xl font-black mb-2" style={{color: '#FFB085'}}>500+</div>
                  <div className="text-sm font-semibold" style={{color: '#A0522D'}}>Recipe Database</div>
                </div>
                <div className="text-center p-6 rounded-xl border-2" 
                     style={{backgroundColor: 'rgba(142, 182, 149, 0.2)', borderColor: '#8EB695'}}>
                  <div className="text-2xl font-black mb-2" style={{color: '#8EB695'}}>Smart</div>
                  <div className="text-sm font-semibold" style={{color: '#A0522D'}}>Meal Planning</div>
                </div>
                <div className="text-center p-6 rounded-xl border-2" 
                     style={{backgroundColor: 'rgba(239, 154, 154, 0.2)', borderColor: '#EF9A9A'}}>
                  <div className="text-2xl font-black mb-2" style={{color: '#EF9A9A'}}>Auto</div>
                  <div className="text-sm font-semibold" style={{color: '#A0522D'}}>Shopping Lists</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="rounded-3xl shadow-2xl p-10 border-2 backdrop-blur-sm"
                   style={{
                     backgroundColor: 'rgba(253, 253, 252, 0.95)',
                     borderColor: 'rgba(255, 176, 133, 0.2)',
                     backdropFilter: 'blur(20px)'
                   }}>
                
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-black mb-4" style={{color: '#2C3A47'}}>
                    Get Started
                  </h3>
                  <p className="text-lg" style={{color: '#A0522D'}}>
                    Join thousands of home chefs
                  </p>
                </div>

          <div className="space-y-4">
            <button
              onClick={() => setAuthMode('signin')}
                    className="w-full py-5 px-8 text-lg font-bold rounded-2xl transition-all duration-300 border-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
              Sign In to Your Account
            </button>
                  
            <button
              onClick={() => setAuthMode('signup')}
                    className="w-full py-5 px-8 text-lg font-bold rounded-2xl transition-all duration-300 border-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: 'transparent',
                      color: '#8EB695',
                      borderColor: '#8EB695'
                    }}
                    onMouseOver={e => {
                      e.target.style.backgroundColor = '#8EB695';
                      e.target.style.color = '#2C3A47';
                    }}
                    onMouseOut={e => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#8EB695';
                    }}
            >
              Create New Account
            </button>
                </div>

                <div className="mt-8 pt-8 border-t-2" style={{borderColor: '#E2E2E2'}}>
                  <p className="text-center text-sm" style={{color: '#A0522D'}}>
                    Trusted by professional chefs and home cooks worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sign In Screen
  if (authMode === 'signin') {
    return (
      <div className="min-h-screen flex items-center justify-center px-8" 
           style={{background: 'linear-gradient(135deg, #FFF2E1 0%, #FDFDFC 50%, #FFD59E 100%)'}}>
        <div className="w-full max-w-lg">
          
          {/* Back Button */}
          <button
            onClick={goBack}
            className="flex items-center font-semibold mb-8 text-lg group transition-all duration-200"
            style={{color: '#A0522D'}}
            onMouseOver={e => e.target.style.color = '#2C3A47'}
            onMouseOut={e => e.target.style.color = '#A0522D'}
          >
            <ArrowLeft className="h-5 w-5 mr-3 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          {/* Main Card */}
          <div className="rounded-3xl shadow-2xl border-2 overflow-hidden backdrop-blur-sm"
               style={{
                 backgroundColor: 'rgba(253, 253, 252, 0.95)',
                 borderColor: 'rgba(255, 176, 133, 0.2)'
               }}>
            
          {/* Header */}
            <div className="p-10 pb-6 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl shadow-lg border-2 flex items-center justify-center"
                     style={{
                       backgroundColor: '#FFB085',
                       borderColor: '#A0522D',
                       background: 'linear-gradient(135deg, #FFB085 0%, #FFD59E 100%)'
                     }}>
                  <Utensils className="h-8 w-8" style={{color: '#2C3A47'}} />
                </div>
              </div>
              <h2 className="text-4xl font-black mb-3" style={{color: '#2C3A47'}}>
                Welcome Back
            </h2>
              <p className="text-lg" style={{color: '#A0522D'}}>
                Continue your culinary journey
            </p>
          </div>

            {/* Form */}
            <div className="px-10 pb-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-3 uppercase tracking-wide" 
                         style={{color: '#2C3A47'}}>Email Address</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5" style={{color: '#A0522D'}} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                      className="block w-full pl-14 pr-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 text-lg transition-all duration-200"
                      style={{
                        borderColor: '#E2E2E2',
                        backgroundColor: '#FDFDFC',
                        color: '#2C3A47'
                      }}
                      onFocus={e => e.target.style.borderColor = '#FFB085'}
                      onBlur={e => e.target.style.borderColor = '#E2E2E2'}
                      placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                  <label htmlFor="password" className="block text-sm font-bold mb-3 uppercase tracking-wide" 
                         style={{color: '#2C3A47'}}>Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5" style={{color: '#A0522D'}} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                      className="block w-full pl-14 pr-14 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 text-lg transition-all duration-200"
                      style={{
                        borderColor: '#E2E2E2',
                        backgroundColor: '#FDFDFC',
                        color: '#2C3A47'
                      }}
                      onFocus={e => e.target.style.borderColor = '#FFB085'}
                      onBlur={e => e.target.style.borderColor = '#E2E2E2'}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center"
                  >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5 transition-colors" style={{color: '#A0522D'}} />
                    ) : (
                        <Eye className="h-5 w-5 transition-colors" style={{color: '#A0522D'}} />
                    )}
                  </button>
                </div>
              </div>

                <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                      className="h-4 w-4 rounded border-2"
                      style={{borderColor: '#8EB695', accentColor: '#8EB695'}}
                  />
                    <label htmlFor="remember-me" className="ml-3 block text-sm font-medium" style={{color: '#A0522D'}}>
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                    <a href="#" className="font-semibold transition-colors" style={{color: '#8EB695'}}>
                    Forgot password?
                  </a>
                </div>
              </div>

                <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                    className="w-full flex justify-center py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style={{
                      backgroundColor: '#FFB085',
                      color: '#2C3A47'
                    }}
                    onMouseOver={e => !isLoading && (e.target.style.backgroundColor = '#FF9A65')}
                    onMouseOut={e => !isLoading && (e.target.style.backgroundColor = '#FFB085')}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
              </form>

              <div className="text-center mt-8 pt-6 border-t-2" style={{borderColor: '#E2E2E2'}}>
                <span className="text-base" style={{color: '#A0522D'}}>Don't have an account? </span>
                <button
                  onClick={() => setAuthMode('signup')}
                  className="font-bold transition-colors text-base"
                  style={{color: '#8EB695'}}
                >
                  Create account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sign Up Screen
  if (authMode === 'signup') {
    return (
      <div className="min-h-screen flex items-center justify-center px-8" 
           style={{background: 'linear-gradient(135deg, #FFF2E1 0%, #FDFDFC 50%, #FFD59E 100%)'}}>
        <div className="w-full max-w-lg">
          
          {/* Back Button */}
          <button
            onClick={goBack}
            className="flex items-center font-semibold mb-8 text-lg group transition-all duration-200"
            style={{color: '#A0522D'}}
            onMouseOver={e => e.target.style.color = '#2C3A47'}
            onMouseOut={e => e.target.style.color = '#A0522D'}
          >
            <ArrowLeft className="h-5 w-5 mr-3 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          {/* Main Card */}
          <div className="rounded-3xl shadow-2xl border-2 overflow-hidden backdrop-blur-sm"
               style={{
                 backgroundColor: 'rgba(253, 253, 252, 0.95)',
                 borderColor: 'rgba(142, 182, 149, 0.2)'
               }}>
            
          {/* Header */}
            <div className="p-10 pb-6 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl shadow-lg border-2 flex items-center justify-center"
                     style={{
                       backgroundColor: '#8EB695',
                       borderColor: '#A0522D',
                       background: 'linear-gradient(135deg, #8EB695 0%, #D9EAD3 100%)'
                     }}>
                  <Utensils className="h-8 w-8" style={{color: '#2C3A47'}} />
                </div>
              </div>
              <h2 className="text-4xl font-black mb-3" style={{color: '#2C3A47'}}>
                Join Our Kitchen
            </h2>
              <p className="text-lg" style={{color: '#A0522D'}}>
                Start your professional cooking journey
            </p>
          </div>

            {/* Form */}
            <div className="px-10 pb-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-3 uppercase tracking-wide" 
                         style={{color: '#2C3A47'}}>Full Name</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <User className="h-5 w-5" style={{color: '#A0522D'}} />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                      className="block w-full pl-14 pr-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 text-lg transition-all duration-200"
                      style={{
                        borderColor: '#E2E2E2',
                        backgroundColor: '#FDFDFC',
                        color: '#2C3A47'
                      }}
                      onFocus={e => e.target.style.borderColor = '#8EB695'}
                      onBlur={e => e.target.style.borderColor = '#E2E2E2'}
                      placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-3 uppercase tracking-wide" 
                         style={{color: '#2C3A47'}}>Email Address</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5" style={{color: '#A0522D'}} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                      className="block w-full pl-14 pr-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 text-lg transition-all duration-200"
                      style={{
                        borderColor: '#E2E2E2',
                        backgroundColor: '#FDFDFC',
                        color: '#2C3A47'
                      }}
                      onFocus={e => e.target.style.borderColor = '#8EB695'}
                      onBlur={e => e.target.style.borderColor = '#E2E2E2'}
                      placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                  <label htmlFor="password" className="block text-sm font-bold mb-3 uppercase tracking-wide" 
                         style={{color: '#2C3A47'}}>Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5" style={{color: '#A0522D'}} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                      className="block w-full pl-14 pr-14 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 text-lg transition-all duration-200"
                      style={{
                        borderColor: '#E2E2E2',
                        backgroundColor: '#FDFDFC',
                        color: '#2C3A47'
                      }}
                      onFocus={e => e.target.style.borderColor = '#8EB695'}
                      onBlur={e => e.target.style.borderColor = '#E2E2E2'}
                      placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center"
                  >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5 transition-colors" style={{color: '#A0522D'}} />
                    ) : (
                        <Eye className="h-5 w-5 transition-colors" style={{color: '#A0522D'}} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-bold mb-3 uppercase tracking-wide" 
                         style={{color: '#2C3A47'}}>Confirm Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5" style={{color: '#A0522D'}} />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                      className="block w-full pl-14 pr-14 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 text-lg transition-all duration-200"
                      style={{
                        borderColor: '#E2E2E2',
                        backgroundColor: '#FDFDFC',
                        color: '#2C3A47'
                      }}
                      onFocus={e => e.target.style.borderColor = '#8EB695'}
                      onBlur={e => e.target.style.borderColor = '#E2E2E2'}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center"
                  >
                    {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 transition-colors" style={{color: '#A0522D'}} />
                    ) : (
                        <Eye className="h-5 w-5 transition-colors" style={{color: '#A0522D'}} />
                    )}
                  </button>
                </div>
              </div>

                <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                    className="w-full flex justify-center py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style={{
                      backgroundColor: '#8EB695',
                      color: '#2C3A47'
                    }}
                    onMouseOver={e => !isLoading && (e.target.style.backgroundColor = '#7EA685')}
                    onMouseOut={e => !isLoading && (e.target.style.backgroundColor = '#8EB695')}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
              </form>

              <div className="text-center mt-8 pt-6 border-t-2" style={{borderColor: '#E2E2E2'}}>
                <span className="text-base" style={{color: '#A0522D'}}>Already have an account? </span>
                <button
                  onClick={() => setAuthMode('signin')}
                  className="font-bold transition-colors text-base"
                  style={{color: '#FFB085'}}
                >
                  Sign in here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Auth;