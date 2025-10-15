import React, { useState } from 'react';
import { MapPin, Menu, X, LogOut, Plus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const scrollToFeaturedSpots = () => {
    const start = Date.now();
    const tryScroll = () => {
      const el = document.getElementById('featured-spots-carousel');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (Date.now() - start < 1000) {
        setTimeout(tryScroll, 50);
      }
    };
    tryScroll();
  };

  const handleFeaturedSpotsClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToFeaturedSpots, 100);
    } else {
      scrollToFeaturedSpots();
    }
  };

  const handleCategoriesClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('categories');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('categories');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="flex items-center fixed top-0 left-0 right-0 z-50 justify-between w-full px-8 py-4 bg-white/90 backdrop-blur-md shadow-lg border-b border-white/40">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <span className="ml-2 text-2xl font-bold text-gray-900">SneakOut</span>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <Link to="/" onClick={handleCategoriesClick} className="text-gray-700 hover:text-indigo-600 transition-colors">Categories</Link>
        <Link to="/" onClick={handleFeaturedSpotsClick} className="text-gray-700 hover:text-indigo-600 transition-colors">Featured Spots</Link>
        <Link to="/add-spot" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add a Spot
        </Link>
        <button 
          onClick={handleLogout}
          className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
      
      {/* Mobile Menu Button */}
      <button 
        className="p-2 rounded hover:bg-gray-200 transition md:hidden" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 top-full right-0 bg-white/95 backdrop-blur-md border-t border-white/40 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            <Link to="/" onClick={handleCategoriesClick} className="block text-gray-700 hover:text-indigo-600">Categories</Link>
            <Link to="/" onClick={handleFeaturedSpotsClick} className="block text-gray-700 hover:text-indigo-600">Featured Spots</Link>
            <Link to="/add-spot" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add a Spot
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full text-gray-700 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 