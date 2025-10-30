import React from 'react';
import { CATEGORIES } from '../utils/constants';
import { MapPin } from 'lucide-react';

const CategoryGrid = ({ selectedCategory, onCategorySelect }) => {
  const allCategories = [{ name: 'All' }, ...CATEGORIES];
  const selectedIndex = Math.max(0, allCategories.findIndex(c => c.name === selectedCategory));

  const handleKeyDown = (e, index) => {
    const cols = 4; // matches md:grid-cols-4
    let next = index;
    switch (e.key) {
      case 'ArrowRight': next = (index + 1) % allCategories.length; break;
      case 'ArrowLeft': next = (index - 1 + allCategories.length) % allCategories.length; break;
      case 'ArrowDown': next = (index + cols) % allCategories.length; break;
      case 'ArrowUp': next = (index - cols + allCategories.length) % allCategories.length; break;
      case 'Enter':
      case ' ': // space
        e.preventDefault();
        onCategorySelect(allCategories[index].name);
        return;
      default: return;
    }
    e.preventDefault();
    const el = document.querySelector(`#cat-${next}`);
    el?.focus();
  };

  return (
    <div className="max-w-[64rem] mx-auto mb-12">
      <h2 className="text-3xl font-bold text-heading mb-2 text-center">Explore by Category</h2>
      <p className="text-subtle text-center mb-6">Choose a vibe to tailor the spots shown below.</p>

      {/* Mobile quick chips (modern gradient pills) */}
      {/* Mobile chip row with fade edges and snap */}
      <div className="relative md:hidden mb-6">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[var(--color-neutral-100)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[var(--color-neutral-100)] to-transparent" />
        <div className="overflow-x-auto whitespace-nowrap no-scrollbar px-1 scroll-fade snap-x snap-mandatory" role="radiogroup" aria-label="Categories quick filter">
        {allCategories.map((category, idx) => {
          const isSelected = selectedCategory === category.name || (!selectedCategory && category.name === 'All');
          return (
            <button
              id={`chip-${idx}`}
              key={`chip-${category.name}`}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onCategorySelect(category.name)}
              className={`gbtn ${isSelected ? 'is-active' : ''} mr-2 snap-center`}
            >
              <span className="gbtn-inner">
                <MapPin className="w-4 h-4" />
                {category.name}
              </span>
            </button>
          );
        })}
        </div>
      </div>

      {/* Desktop modern gradient cards */}
      <div role="radiogroup" aria-label="Categories" className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-6">
        {allCategories.map((category, idx) => {
          const isSelected = selectedCategory === category.name;
          return (
            <button
              id={`cat-${idx}`}
              key={category.name}
              role="radio"
              aria-checked={isSelected}
              tabIndex={idx === (selectedIndex === -1 ? 0 : selectedIndex) ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onClick={() => onCategorySelect(category.name)}
              className={`gcard ${isSelected ? 'is-active' : ''}`}
            >
              <div className="gcard-inner w-full">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white grid place-items-center shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="mt-3 text-base font-semibold text-heading">{category.name}</span>
                <span className="text-xs text-subtle opacity-80">Tap to explore</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default CategoryGrid; 