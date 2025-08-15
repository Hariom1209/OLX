import React, { useMemo } from 'react';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';

const Home: React.FC = () => {
  const { properties, searchTerm, filters } = useProperty();

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Search term filter
      if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !property.location.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Property type filter
      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        return false;
      }

      // Bedroom filter
      if (filters.bedrooms) {
        if (filters.bedrooms === '4' && property.bedrooms < 4) return false;
        if (filters.bedrooms !== '4' && property.bedrooms.toString() !== filters.bedrooms) return false;
      }

      // Price range filter
      if (property.price < filters.minPrice || property.price > filters.maxPrice) {
        return false;
      }

      // Location filter
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [properties, searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            More on For Rent: Houses & Apartments
          </h1>
          <p className="text-gray-600">
            {filteredProperties.length} properties found
          </p>
        </div>

        {/* Search Filters */}
        <SearchFilters />

        {/* Featured Properties Section */}
        {filteredProperties.some(p => p.isFeatured) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties
                .filter(property => property.isFeatured)
                .map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
            </div>
          </div>
        )}

        {/* All Properties Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {filteredProperties.some(p => p.isFeatured) ? 'More Properties' : 'All Properties'}
          </h2>
          
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No properties found</div>
              <p className="text-gray-400">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties
                .filter(property => !property.isFeatured)
                .map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-white border border-gray-300 hover:bg-gray-50 px-8 py-3 rounded-md font-medium transition-colors">
              Load more results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;