// app/recipes/[id]/page.js


async function getRecipeDetails(id) {
  const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=`);
  if (!res.ok) {
    throw new Error('No se pudo encontrar la receta.');
  }
  return res.json();
}

export async function generateMetadata({ params }) {
    const recipe = await getRecipeDetails(params.id);

    return {
        title: recipe.title,
        description: recipe.summary,
        openGraph: {
            images: [recipe.image],
        },
    };
}

export default async function RecipePage({ params }) {
  const recipe = await getRecipeDetails(params.id);

  return (
    <main className="container mx-auto p-4">
      {recipe ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <img src={recipe.image} alt={recipe.title} className="w-full rounded-lg shadow-lg mb-6" />

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-2">Ingredientes:</h2>
            <ul className="list-disc ml-6 mb-4">
              {recipe.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold mb-2">Instrucciones:</h2>
            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} className="list-decimal ml-6"></div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Receta no encontrada.</p>
      )}
    </main>
  );
}