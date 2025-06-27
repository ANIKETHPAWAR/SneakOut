// Color utilities for consistent styling across components

export const getCategoryColor = (category) => {
  const colors = {
    food: 'bg-orange-100 text-orange-800',
    adventure: 'bg-green-100 text-green-800',
    photo: 'bg-blue-100 text-blue-800',
    hidden: 'bg-purple-100 text-purple-800',
    cultural: 'bg-red-100 text-red-800',
    nature: 'bg-emerald-100 text-emerald-800',
    urban: 'bg-gray-100 text-gray-800',
    other: 'bg-slate-100 text-slate-800'
  };
  return colors[category?.toLowerCase()] || colors.other;
};

export const getDifficultyColor = (difficulty) => {
  const colors = {
    easy: 'text-green-600',
    medium: 'text-yellow-600',
    hard: 'text-red-600'
  };
  return colors[difficulty?.toLowerCase()] || colors.easy;
};

export const getCategoryIcon = (category) => {
  const icons = {
    food: '🍕',
    adventure: '🏔️',
    photo: '📸',
    hidden: '🔍',
    cultural: '🏛️',
    nature: '🌿',
    urban: '🏙️',
    other: '📍'
  };
  return icons[category?.toLowerCase()] || icons.other;
}; 