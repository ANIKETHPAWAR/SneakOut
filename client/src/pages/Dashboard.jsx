import React from 'react';
import { MapPin, Menu, Search,Star,X } from 'lucide-react';
import {Link }from'react-router-dom';
import {useState} from 'react'
const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center fixed justify-between w-full px-8 py-4 bg-white bg-opacity-80 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <span className="ml-2 text-2xl font-bold text-gray-900">SneakOut</span>
        </div> <div className="hidden md:flex items-center space-x-8">
              <Link to="#explore" className="text-gray-700 hover:text-indigo-600 transition-colors">Explore</Link>
              <Link to="#categories" className="text-gray-700 hover:text-indigo-600 transition-colors">Categories</Link>
              <Link to="#community" className="text-gray-700 hover:text-indigo-600 transition-colors">Community</Link>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
            </div>
        <button className="p-2 rounded hover:bg-gray-200 transition md:hidden " onClick={()=> setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ?<X className="w-6 h-6"/>:<Menu className="w-6 h-6 text-gray-700" />}
        </button>

{/*Mobile Layout */}
{isMenuOpen && (
          <div className="md:hidden absolute left-0 top-full right-0 bg-white border-t border-gray-200">
            <div className="px-4 py-3 space-y-3 ">
              <Link to="#explore" className="block text-gray-700 hover:text-indigo-600">Explore</Link>
              <Link to="#categories" className="block text-gray-700 hover:text-indigo-600">Categories</Link>
              <Link to="#community" className="block text-gray-700 hover:text-indigo-600">Community</Link>
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}


      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-7 my-4 min-h-screen">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mt-8">
          Discover Hidden <span className="text-yellow-400">Adventures</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto">
          Find secret spots, amazing photo locations, hidden food gems, and adventure trails, that only locals know about.<br />
          
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center ">
          <button className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow hover:bg-gray-100 border border-white/30 transition">
            <Search className="w-5 h-5" />
            Start Exploring
          </button>
          <button className="flex items-center justify-center gap-2 px-8 py-3 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white/10 transition">
            <MapPin className="w-5 h-5" />
            Add a Spot
          </button>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-400">8.7k+</span>
            <span className="text-purple-100 mt-1">Hidden Spots</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-green-400">25k+</span>
            <span className="text-purple-100 mt-1">Explorers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-400">150+</span>
            <span className="text-purple-100 mt-1">Cities</span>
          </div>
          <div className="flex flex-col
          items-center ">
            <div className=" flex items-center gap-2">
            <span className="text-3xl font-bold text-purple-200 justify-between ">4.9 </span>
            <Star className="w-4 h-4 text-yellow-300  "/>
            </div>
           <span className="text-purple-100 mt-1">Average Rating</span>
          </div>
          
        </div>
      </main>
      <div className="min-h-screen bg-white">
        {/* hello removed */}
      </div>

    </div>
  );
};

export default Dashboard; 