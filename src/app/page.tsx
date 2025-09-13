// app/page.js
import RecipeCard from './components/RecipeCard';
import SearchForm from './components/SearchForm';

// Este componente se renderiza en el servidor
async function getRecipes(query) {
  if (!query) return [];
  const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=`);
  if (!res.ok) {
    throw new Error('No se pudo obtener la información de las recetas.');
  }
  const data = await res.json();
  return data.results;
}

export default async function Page({ searchParams }) {
  const query = searchParams.q;
  const recipes = await getRecipes(query);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Busca tu Receta Favorita</h1>
      {/* El formulario para la búsqueda, con un Client Component */}
      <SearchForm />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            {query ? 'No se encontraron recetas.' : 'Ingresa un término para empezar a buscar.'}
          </p>
        )}
      </div>
    </main>
  );
}