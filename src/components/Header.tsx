import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Heart, Plus } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const { searchTerm, setSearchTerm } = useProperty();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-teal-700 text-white px-3 py-2 rounded-md font-bold text-xl">
              OLX
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <select className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Noida, Uttar Pradesh</option>
                <option>Delhi</option>
                <option>Gurgaon</option>
              </select>
              <input
                type="text"
                placeholder="Find Cars, Mobile Phones and more..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-r-md transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-teal-700 font-medium transition-colors"
            >
              Properties
            </Link>
            <Link 
              to="/favorites" 
              className="flex items-center space-x-1 text-gray-700 hover:text-teal-700 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>Favorites</span>
            </Link>
            <Link 
              to="/post-ad" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>SELL</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search properties..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded-r-md"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-teal-700 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            <Link 
              to="/favorites" 
              className="flex items-center space-x-2 text-gray-700 hover:text-teal-700 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="w-5 h-5" />
              <span>Favorites</span>
            </Link>
            <Link 
              to="/post-ad" 
              className="block bg-orange-500 text-white px-4 py-2 rounded-md font-medium text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              SELL
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;