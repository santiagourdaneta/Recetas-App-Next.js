// src/app/components/RecipeCard.js

import Link from 'next/link';

export default function RecipeCard({ recipe }) {
  if (!recipe) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link href={`/recipes/${recipe.id}`}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
        </div>
      </Link>
    </div>
  );
}