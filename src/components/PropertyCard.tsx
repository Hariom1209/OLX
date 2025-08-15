import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Camera } from 'lucide-react';
import { Property } from '../context/PropertyContext';
import { useProperty } from '../context/PropertyContext';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { favorites, toggleFavorite } = useProperty();
  const isFavorite = favorites.includes(property.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <Link to={`/property/${property.id}`}>
          <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
            {property.images && property.images.length > 0 ? (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Camera className="w-12 h-12" />
              </div>
            )}
          </div>
        </Link>
        
        {/* Featured Badge */}
        {property.isFeatured && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold">
            FEATURED
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(property.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Image Count */}
        {property.images && property.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Camera className="w-3 h-3" />
            <span>{property.images.length}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <Link to={`/property/${property.id}`}>
          <div className="space-y-2">
            {/* Price */}
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(property.price)}
            </div>

            {/* Property Details */}
            <div className="text-sm text-gray-600">
              {property.bedrooms} BHK - {property.bathrooms} Bathroom - {property.area}
            </div>

            {/* Title */}
            <h3 className="font-medium text-gray-800 line-clamp-2 hover:text-teal-700 transition-colors">
              {property.title}
            </h3>

            {/* Location */}
            <p className="text-sm text-gray-600 uppercase tracking-wide">
              {property.location}
            </p>

            {/* Date */}
            <p className="text-xs text-gray-500">
              {getTimeAgo(property.postedDate)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;