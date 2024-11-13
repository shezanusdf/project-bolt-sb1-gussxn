import React from 'react';
import { BookOpen, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { RecipeCard } from './components/RecipeCard';
import { SavedRecipes } from './components/SavedRecipes';
import { FilterDrawer } from './components/FilterDrawer';
import { RecipeDetails } from './components/RecipeDetails';
import { searchDesserts, getRecipeDetails, getRandomDessert } from './services/api';
import type { Recipe, RecipeFilters } from './types/Recipe';

const queryClient = new QueryClient();

function AppContent() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [savedRecipes, setSavedRecipes] = React.useState<Recipe[]>([]);
  const [showSaved, setShowSaved] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [filters, setFilters] = React.useState<RecipeFilters>({});
  const [isRandom, setIsRandom] = React.useState(false);

  const { data: desserts, isLoading } = useQuery(
    ['desserts', filters],
    () => searchDesserts(),
    {
      enabled: !isRandom,
    }
  );

  const { data: randomRecipe, refetch: refetchRandom } = useQuery(
    'randomDessert',
    getRandomDessert,
    {
      enabled: isRandom,
    }
  );

  const { data: currentRecipe, isLoading: isLoadingDetails } = useQuery(
    ['recipeDetails', desserts?.[currentIndex]?.idMeal],
    () => getRecipeDetails(desserts?.[currentIndex]?.idMeal),
    {
      enabled: !isRandom && !!desserts?.[currentIndex]?.idMeal,
    }
  );

  const handleSwipe = (direction: 'left' | 'right') => {
    const recipe = isRandom ? randomRecipe : currentRecipe;
    if (direction === 'right' && recipe) {
      setSavedRecipes((prev) => [...prev, recipe]);
    }
    if (isRandom) {
      refetchRandom();
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, (desserts?.length || 0) - 1));
    }
  };

  const toggleRandomMode = () => {
    setIsRandom(!isRandom);
    if (!isRandom) {
      refetchRandom();
    }
  };

  const activeRecipe = isRandom ? randomRecipe : currentRecipe;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <header className="p-4 flex justify-between items-center max-w-md mx-auto">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          SweetSwipe
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(true)}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
            title="Filter recipes"
          >
            <SlidersHorizontal className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={toggleRandomMode}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
            title={isRandom ? 'Switch to regular mode' : 'Switch to random mode'}
          >
            <RefreshCw className={`w-6 h-6 ${isRandom ? 'text-pink-600' : 'text-gray-700'}`} />
          </button>
          <button
            onClick={() => setShowSaved(true)}
            className="p-2 hover:bg-white/50 rounded-full transition-colors relative"
          >
            <BookOpen className="w-6 h-6 text-gray-700" />
            {savedRecipes.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {savedRecipes.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="p-4 max-w-md mx-auto pt-8">
        {activeRecipe ? (
          <RecipeCard
            recipe={activeRecipe}
            onSwipe={handleSwipe}
            loading={isLoading || isLoadingDetails}
            onViewDetails={() => setShowDetails(true)}
          />
        ) : (
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold mb-2">No more recipes!</h2>
            <p className="text-gray-600">
              Check your saved recipes or try random mode for more delicious desserts.
            </p>
          </div>
        )}
      </main>

      {showSaved && (
        <SavedRecipes
          recipes={savedRecipes}
          onClose={() => setShowSaved(false)}
          onViewDetails={(recipe) => {
            setShowDetails(true);
            setShowSaved(false);
          }}
        />
      )}

      {showFilters && (
        <FilterDrawer
          filters={filters}
          onFilterChange={setFilters}
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {showDetails && activeRecipe && (
        <RecipeDetails
          recipe={activeRecipe}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;