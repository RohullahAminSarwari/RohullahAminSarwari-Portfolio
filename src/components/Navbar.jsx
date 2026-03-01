import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { isAdmin, showAdminAccess } = useData();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsVisible(true);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', icon: 'fas fa-home' },
    { name: 'Resume', path: '/resume', icon: 'fas fa-file-alt' },
    { name: 'About', path: '/about', icon: 'fas fa-user' },
    { name: 'Projects', path: '/projects', icon: 'fas fa-folder-open' },
    { name: 'Blog', path: '/blog', icon: 'fas fa-blog' },
    { name: 'Contact', path: '/contact', icon: 'fas fa-envelope' }
  ];

  // Add admin link if user is in admin mode
  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin/dashboard', icon: 'fas fa-cog' });
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md py-3 shadow-lg border-b border-gray-200 dark:border-gray-800' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Removed as requested */}
          <div className="flex items-center">
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50 backdrop-blur-sm'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <i className={`${link.icon} text-xs`}></i>
                    <span>{link.name}</span>
                  </span>
                  {location.pathname === link.path && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </Link>
              ))}
              
              {/* Theme Toggle */}
              <div className="ml-4">
                <ThemeToggle />
              </div>
              
              {/* Admin Access Link - Only visible with secret code */}
              {showAdminAccess && (
                <div className="ml-2">
                  <Link
                    to="/admin"
                    className="text-gray-400 hover:text-blue-400 text-sm opacity-60 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                    title="Admin Access"
                  >
                    <i className="fas fa-cog"></i>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:block lg:hidden">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.slice(0, 4).map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <i className={`${link.icon} text-xs`}></i>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group relative bg-gray-800/50 backdrop-blur-sm inline-flex items-center justify-center p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none transition-all duration-300 transform hover:scale-105"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  isOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}></span>
                <span className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  isOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-500 ease-in-out ${
        isOpen 
          ? 'max-h-96 opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-900/95 backdrop-blur-md border-t border-white/10">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                location.pathname === link.path
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <i className={`${link.icon} text-lg w-5`}></i>
              <span>{link.name}</span>
              {location.pathname === link.path && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
          ))}
          
          {/* Mobile Admin Access - Only visible with secret code */}
          {showAdminAccess && (
            <div className="flex justify-center pt-2">
              <Link
                to="/admin"
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <i className="fas fa-cog"></i>
                <span className="text-sm">Admin Access</span>
              </Link>
            </div>
          )}
          
          {/* Mobile Theme Toggle */}
          <div className="flex justify-center pt-2 border-t border-white/10">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;