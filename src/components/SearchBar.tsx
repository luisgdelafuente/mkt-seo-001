import React from 'react';
import { Search } from 'lucide-react';
import { COUNTRIES, LANGUAGES } from '../constants';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  country: string;
  setCountry: (country: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export function SearchBar({
  query,
  setQuery,
  country,
  setCountry,
  language,
  setLanguage,
  onSearch,
  loading,
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Qué estás buscando?"
          className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200"
        >
          {COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none font-medium text-lg"
        >
          <Search size={24} />
          <span>{loading ? 'Buscando...' : 'Buscar'}</span>
        </button>
      </div>
    </form>
  );
}