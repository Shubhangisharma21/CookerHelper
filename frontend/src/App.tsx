import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import RecipeManager from './components/RecipeManager';
import Navbar from './components/Navbar';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/recipes"
              element={
                <ProtectedRoute>
                  <RecipeManager />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/recipes" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 