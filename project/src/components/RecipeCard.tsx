import React from 'react';
import { Library, Globe, Eye } from 'lucide-react';
import type { Recipe } from '../types/Recipe';

interface Props {
  recipe: Recipe;
  onSwipe: (direction: 'left' | 'right') => void;
  onViewDetails: () => void;
  loading?: boolean;
}

export function RecipeCard({ recipe, onSwipe, onViewDetails, loading }: Props) {
  const [startX, setStartX] = React.useState(0);
  const [currentX, setCurrentX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setCurrentX(clientX - startX);
  };

  const handleTouchEnd = () => {
    if (Math.abs(currentX) > 100) {
      onSwipe(currentX > 0 ? 'right' : 'left');
    }
    setCurrentX(0);
    setIsDragging(false);
  };

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto h-[600px] bg-white rounded-2xl shadow-xl animate-pulse">
        <div className="h-1/2 bg-gray-200 rounded-t-2xl" />
        <div className="p-6 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([_, value]) => value);

  const cardStyle = {
    transform: `translateX(${currentX}px) rotate(${currentX * 0.1}deg)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease',
  };

  return (
    <div
      className="relative w-full max-w-md mx-auto h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden"
      style={cardStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-1/2 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{recipe.strMeal}</h2>
          <button
            onClick={onViewDetails}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Library className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{recipe.strCategory}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{recipe.strArea}</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Key Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.slice(0, 3).map((ingredient, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onSwipe('left')}
            className="w-12 h-12 flex items-center justify-center bg-red-500 rounded-full text-white shadow-lg hover:bg-red-600 transition-colors"
          >
            ✕
          </button>
          <button
            onClick={() => onSwipe('right')}
            className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full text-white shadow-lg hover:bg-green-600 transition-colors"
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}