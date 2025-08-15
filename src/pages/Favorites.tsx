import React from 'react';
import { Heart } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';

const Favorites: React.FC = () => {
  const { properties, favorites } = useProperty();
  
  const favoriteProperties = properties.filter(property => 
    favorites.includes(property.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              My Favorites
            </h1>
          </div>
          <p className="text-gray-600">
            {favoriteProperties.length} properties saved
          </p>
        </div>

        {favoriteProperties.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start exploring properties and save your favorites here
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors"
            >
              Explore Properties
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;