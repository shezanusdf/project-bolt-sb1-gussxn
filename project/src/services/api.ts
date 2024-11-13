const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchDesserts(query?: string) {
  const response = await fetch(`${BASE_URL}/filter.php?c=Dessert`);
  const data = await response.json();
  return data.meals || [];
}

export async function getRandomDessert() {
  const response = await fetch(`${BASE_URL}/random.php`);
  const data = await response.json();
  return data.meals?.[0];
}

export async function getRecipeDetails(id: string) {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals?.[0];
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories.php`);
  const data = await response.json();
  return data.categories || [];
}