import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  furnishing: string;
  constructionStatus: string;
  listedBy: string;
  superBuiltupArea: number;
  carpetArea: number;
  maintenance: number;
  totalFloors: number;
  floorNo: number;
  carParkingSpaces: number;
  facing: string;
  projectName: string;
  locality: string;
  landmark: string;
  description: string;
  images: string[];
  postedDate: Date;
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  isFeatured: boolean;
}

interface PropertyContextType {
  properties: Property[];
  favorites: string[];
  addProperty: (property: Omit<Property, 'id' | 'postedDate'>) => void;
  toggleFavorite: (propertyId: string) => void;
  getPropertyById: (id: string) => Property | undefined;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: PropertyFilters;
  setFilters: (filters: PropertyFilters) => void;
}

interface PropertyFilters {
  minPrice: number;
  maxPrice: number;
  propertyType: string;
  bedrooms: string;
  location: string;
}

const defaultFilters: PropertyFilters = {
  minPrice: 0,
  maxPrice: 10000000,
  propertyType: '',
  bedrooms: '',
  location: ''
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

// Sample data that matches OLX's property listings
const sampleProperties: Property[] = [
  {
    id: '1',
    title: '3 bhk semi furnished flat',
    price: 23000,
    location: 'Noida Extension, Greater Noida',
    area: '1874 sqft',
    bedrooms: 3,
    bathrooms: 3,
    propertyType: 'Apartment',
    furnishing: 'Semi-Furnished',
    constructionStatus: 'Ready to Move',
    listedBy: 'Owner',
    superBuiltupArea: 1874,
    carpetArea: 1650,
    maintenance: 2500,
    totalFloors: 15,
    floorNo: 8,
    carParkingSpaces: 2,
    facing: 'North-East',
    projectName: 'Stellar Gardens',
    locality: 'Noida Extension',
    landmark: 'Near Metro Station',
    description: '3 BHK semi furnished flat with all amenities. Well ventilated rooms with proper sunlight.',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg'
    ],
    postedDate: new Date('2024-01-16'),
    sellerId: 'seller1',
    sellerName: 'Rajesh Kumar',
    sellerPhone: '+91-9876543210',
    isFeatured: true
  },
  {
    id: '2',
    title: '2 bhk semi furnished flat',
    price: 14500,
    location: 'Noida Extension, Greater Noida',
    area: '1200 sqft',
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'Apartment',
    furnishing: 'Semi-Furnished',
    constructionStatus: 'Ready to Move',
    listedBy: 'Owner',
    superBuiltupArea: 1200,
    carpetArea: 1050,
    maintenance: 1800,
    totalFloors: 12,
    floorNo: 5,
    carParkingSpaces: 1,
    facing: 'South',
    projectName: 'Green Valley',
    locality: 'Sector 12',
    landmark: 'Near Shopping Mall',
    description: '2 BHK apartment with modern amenities and great location connectivity.',
    images: [
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg'
    ],
    postedDate: new Date('2024-01-10'),
    sellerId: 'seller2',
    sellerName: 'Priya Sharma',
    sellerPhone: '+91-9876543211',
    isFeatured: true
  },
  {
    id: '3',
    title: 'Independent 1 Room Set on Rent Noida',
    price: 6500,
    location: 'Sector 49, Noida',
    area: '350 sqft',
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'Independent Room',
    furnishing: 'Semi-Furnished',
    constructionStatus: 'Ready to Move',
    listedBy: 'Owner',
    superBuiltupArea: 350,
    carpetArea: 300,
    maintenance: 500,
    totalFloors: 3,
    floorNo: 1,
    carParkingSpaces: 0,
    facing: 'North-East',
    projectName: '',
    locality: 'Sector 49',
    landmark: 'Near Bus Stop',
    description: '1 Room set on rent with basic amenities. Suitable for working professionals.',
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'
    ],
    postedDate: new Date('2024-01-22'),
    sellerId: 'seller3',
    sellerName: 'Sarthak Bansal',
    sellerPhone: '+91-9876543212',
    isFeatured: true
  },
  {
    id: '4',
    title: 'Fully furnished rooms for rent',
    price: 14000,
    location: 'Sector 135, Noida',
    area: '2400 sqft',
    bedrooms: 4,
    bathrooms: 4,
    propertyType: 'Apartment',
    furnishing: 'Furnished',
    constructionStatus: 'Ready to Move',
    listedBy: 'Owner',
    superBuiltupArea: 2400,
    carpetArea: 2100,
    maintenance: 3000,
    totalFloors: 20,
    floorNo: 12,
    carParkingSpaces: 2,
    facing: 'West',
    projectName: 'Skyline Towers',
    locality: 'Sector 135',
    landmark: 'Near Metro Station',
    description: 'Premium 4 BHK fully furnished apartment with all modern amenities.',
    images: [
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg'
    ],
    postedDate: new Date('2024-01-15'),
    sellerId: 'seller4',
    sellerName: 'Amit Verma',
    sellerPhone: '+91-9876543213',
    isFeatured: false
  },
  {
    id: '5',
    title: '1 BHK Apartment for Rent',
    price: 8500,
    location: 'Sector 18, Noida',
    area: '650 sqft',
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'Apartment',
    furnishing: 'Unfurnished',
    constructionStatus: 'Ready to Move',
    listedBy: 'Builder',
    superBuiltupArea: 650,
    carpetArea: 550,
    maintenance: 1200,
    totalFloors: 8,
    floorNo: 3,
    carParkingSpaces: 1,
    facing: 'East',
    projectName: 'Urban Heights',
    locality: 'Sector 18',
    landmark: 'Near City Mall',
    description: 'Compact 1 BHK apartment in prime location with easy access to metro and shopping.',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    postedDate: new Date('2024-01-08'),
    sellerId: 'seller5',
    sellerName: 'Neha Singh',
    sellerPhone: '+91-9876543214',
    isFeatured: false
  }
];

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);

  const addProperty = (propertyData: Omit<Property, 'id' | 'postedDate'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      postedDate: new Date()
    };
    setProperties(prev => [newProperty, ...prev]);
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const getPropertyById = (id: string) => {
    return properties.find(property => property.id === id);
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      favorites,
      addProperty,
      toggleFavorite,
      getPropertyById,
      searchTerm,
      setSearchTerm,
      filters,
      setFilters
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};