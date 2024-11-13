import React from 'react';
import { Library, Globe, Eye } from 'lucide-react';
import type { Recipe } from '../types/Recipe';

interface Props {
  recipes: Recipe[];
  onClose: () => void;
  onViewDetails: (recipe: Recipe) => void;
}

export function SavedRecipes({ recipes, onClose, onViewDetails }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Saved Recipes</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ✕
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 space-y-4">
          {recipes.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No saved recipes yet. Start swiping right on recipes you like!
            </p>
          ) : (
            recipes.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold mb-1">{recipe.strMeal}</h3>
                    <button
                      onClick={() => onViewDetails(recipe)}
                      className="p-1 hover:bg-gray-200 rounded-full"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Library className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{recipe.strCategory}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{recipe.strArea}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}