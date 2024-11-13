export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  [key: string]: string | undefined;
}

export interface RecipeFilters {
  difficulty?: string;
  category?: string;
  area?: string;
}