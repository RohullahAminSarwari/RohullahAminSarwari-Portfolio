import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const { loginAdmin, isAdmin } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    if (isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isBlocked) {
      setError('Too many failed attempts. Please wait before trying again.');
      return;
    }
    
    if (loginAdmin(password)) {
      setAttempts(0);
      alert('Login successful! Welcome to the admin dashboard.');
      navigate('/admin/dashboard');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setIsBlocked(true);
        setError('Too many failed attempts. Access blocked for 5 minutes.');
        alert('Too many failed attempts. You have been blocked for 5 minutes.');
        setTimeout(() => {
          setIsBlocked(false);
          setAttempts(0);
          setError('');
        }, 300000); // 5 minutes
      } else {
        setError(`Invalid password. ${3 - newAttempts} attempts remaining.`);
        alert(`Invalid password. ${3 - newAttempts} attempts remaining.`);
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className={`max-w-md w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-white/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-shield-alt text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-400">Enter password to access admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                  placeholder="Enter admin password"
                  required
                />
                <i className="fas fa-lock absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm flex items-center">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isBlocked}
              className={`w-full py-3 px-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 transform ${
                isBlocked 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105'
              }`}
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              {isBlocked ? 'Access Blocked' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
