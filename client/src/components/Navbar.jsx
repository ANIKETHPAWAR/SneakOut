import React, { useState } from 'react';
import { MapPin, Menu, X, LogOut, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex items-center fixed top-0 left-0 right-0 z-50 justify-between w-full px-8 py-4 bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <span className="ml-2 text-2xl font-bold text-gray-900">SneakOut</span>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <Link to="#explore" className="text-gray-700 hover:text-indigo-600 transition-colors">Explore</Link>
        <Link to="#categories" className="text-gray-700 hover:text-indigo-600 transition-colors">Categories</Link>
        <Link to="#community" className="text-gray-700 hover:text-indigo-600 transition-colors">Community</Link>
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
        <div className="md:hidden absolute left-0 top-full right-0 bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <Link to="#explore" className="block text-gray-700 hover:text-indigo-600">Explore</Link>
            <Link to="#categories" className="block text-gray-700 hover:text-indigo-600">Categories</Link>
            <Link to="#community" className="block text-gray-700 hover:text-indigo-600">Community</Link>
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