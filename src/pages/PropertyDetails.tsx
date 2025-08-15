import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Heart, Share2, Home, Bed, Bath, Car } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import ImageCarousel from '../components/ImageCarousel';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById, favorites, toggleFavorite } = useProperty();
  
  if (!id) {
    return <Navigate to="/" replace />;
  }

  const property = getPropertyById(id);
  
  if (!property) {
    return <Navigate to="/" replace />;
  }

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

  const detailItems = [
    { label: 'Type', value: property.propertyType },
    { label: 'Flats / Apartments', value: property.propertyType },
    { label: 'Bedrooms', value: property.bedrooms.toString() },
    { label: 'Bathrooms', value: property.bathrooms.toString() },
    { label: 'Super Built-up area sqft', value: `${property.superBuiltupArea} sqft` },
    { label: 'Semi-Furnished', value: property.furnishing },
    { label: 'Bachelors Allowed', value: 'Yes' },
    { label: 'Carpet area sqft', value: `${property.carpetArea} sqft` },
    { label: 'Floor No', value: property.floorNo.toString() },
    { label: 'Car Parking', value: property.carParkingSpaces.toString() },
    { label: 'Facing', value: property.facing },
    { label: 'Maintenance (Monthly)', value: `₹${property.maintenance}` },
    { label: 'Total Floors', value: property.totalFloors.toString() }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Carousel */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <ImageCarousel images={property.images} title={property.title} />
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {detailItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-2">
                    <div className="text-sm text-gray-600">{item.label}</div>
                    <div className="font-medium text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                Direct owner<br />
                Interested parties may contact
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Price & Basic Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-gray-900">
                  {formatPrice(property.price)}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Share2 className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-lg font-medium text-gray-900">{property.title}</div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms} BHK</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms} Bathroom</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Home className="w-4 h-4" />
                    <span>{property.area}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                {getTimeAgo(property.postedDate)}
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {property.sellerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Posted by {property.sellerName}</div>
                  <div className="text-sm text-gray-500">Member since Jan 2024</div>
                </div>
              </div>

              <button className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-md font-medium transition-colors mb-3 flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Chat with seller</span>
              </button>

              <div className="text-center">
                <div className="text-sm text-gray-600">Posted in</div>
                <div className="font-medium text-gray-900">{property.locality}</div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-medium text-gray-900 mb-4">Location</h3>
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-20"></div>
                <div className="relative z-10 text-center">
                  <MapPin className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">{property.locality}</div>
                  <div className="text-xs text-gray-500">{property.location}</div>
                </div>
              </div>
              <div className="mt-4 text-center text-xs text-gray-500">
                AD ID: {property.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;