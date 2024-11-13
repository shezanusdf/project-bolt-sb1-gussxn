import React from 'react';
import { X, Clock, ChefHat, Scale } from 'lucide-react';
import type { Recipe } from '../types/Recipe';

interface Props {
  recipe: Recipe;
  onClose: () => void;
}

export function RecipeDetails({ recipe, onClose }: Props) {
  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value], index) => ({
      ingredient: value,
      measure: recipe[`strMeasure${key.slice(13)}`],
    }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="relative h-64">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <h2 className="text-2xl font-bold mb-4">{recipe.strMeal}</h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-gray-500" />
              <span>{recipe.strCategory}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span>{recipe.difficulty || 'Medium'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-gray-500" />
              <span>{recipe.strArea}</span>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <div className="grid grid-cols-2 gap-2">
                {ingredients.map(({ ingredient, measure }, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
                      alt={ingredient}
                      className="w-8 h-8 object-cover"
                    />
                    <div>
                      <p className="font-medium">{ingredient}</p>
                      <p className="text-sm text-gray-600">{measure}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">Instructions</h3>
              <div className="space-y-4">
                {recipe.strInstructions.split('\n').map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {recipe.strYoutube && (
              <section>
                <h3 className="text-lg font-semibold mb-3">Video Tutorial</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}
                    title="Recipe Video Tutorial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}