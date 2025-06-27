import React from 'react';
import { CATEGORIES } from '../utils/constants';
import { MapPin } from 'lucide-react';

const CategoryGrid = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="max-w-5xl mx-auto mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Explore by Category</h2>
      <p className="text-gray-600 text-center mb-6">
        Whether you're seeking adventure, perfect shots, amazing food, or sports activities, we've got you covered.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {CATEGORIES.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category.name)}
            className={`flex flex-col items-center justify-center rounded-2xl p-6 shadow hover:shadow-lg transition-all border-2 ${
              category.color
            } ${
              selectedCategory === category.name ? 'ring-4 ring-purple-400' : ''
            }`}
          >
            <MapPin className={`w-8 h-8 ${category.iconColor}`} />
            <span className="mt-4 text-xl font-semibold">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid; 