import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import type { RecipeFilters } from '../types/Recipe';

interface Props {
  filters: RecipeFilters;
  onFilterChange: (filters: RecipeFilters) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function FilterDrawer({ filters, onFilterChange, isOpen, onClose }: Props) {
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const categories = ['Cake', 'Pie', 'Ice Cream', 'Cookies', 'Pudding'];
  const areas = ['American', 'British', 'French', 'Italian', 'Japanese'];

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h3 className="font-medium mb-3">Difficulty</h3>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <label key={difficulty} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="difficulty"
                  value={difficulty}
                  checked={filters.difficulty === difficulty}
                  onChange={(e) =>
                    onFilterChange({ ...filters, difficulty: e.target.value })
                  }
                  className="text-pink-500 focus:ring-pink-500"
                />
                {difficulty}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Category</h3>
          <select
            value={filters.category || ''}
            onChange={(e) =>
              onFilterChange({ ...filters, category: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="font-medium mb-3">Region</h3>
          <select
            value={filters.area || ''}
            onChange={(e) => onFilterChange({ ...filters, area: e.target.value })}
            className="w-full p-2 border rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          >
            <option value="">All Regions</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onFilterChange({})}
          className="w-full py-2 text-pink-600 font-medium hover:bg-pink-50 rounded-lg transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}