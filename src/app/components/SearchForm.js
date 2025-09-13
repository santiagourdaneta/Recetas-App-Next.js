// app/components/SearchForm.js
'use client'; // <-- Marca este componente como un Client Component
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/?q=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ej. 'pasta carbonara'"
        className="w-full p-2 border rounded shadow"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mt-2">
        Buscar
      </button>
    </form>
  );
}