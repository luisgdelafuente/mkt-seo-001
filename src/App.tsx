import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import type { SearchResponse, SearchParams } from './types';
import { Search } from 'lucide-react';

const API_KEY = 'AIzaSyC8hunz9dPry634fK7zKi36tQTkaDG1P1k';
const CX = 'e072eb045622d454b';

function App() {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('ES');
  const [language, setLanguage] = useState('lang_es');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(1);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleSearch = async (start = 1) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    const params: SearchParams = {
      q: query,
      gl: country,
      lr: language,
      start: start.toString(),
      num: '10',
      safe: 'off',
      filter: '1' // Activamos el filtro para evitar resultados duplicados
    };

    const searchParams = new URLSearchParams({
      key: API_KEY,
      cx: CX,
      ...params,
    });

    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?${searchParams}`
      );
      
      if (!response.ok) {
        throw new Error('Error en la búsqueda. Por favor, inténtalo de nuevo.');
      }

      const data: SearchResponse = await response.json();
      
      if (!data.items || data.items.length === 0) {
        setError('No se encontraron resultados para esta búsqueda.');
        setResults(null);
        return;
      }

      setResults(data);
      setStartIndex(start);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error inesperado');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newStartIndex: number) => {
    handleSearch(newStartIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Search size={32} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Buscador Google Personalizado
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Generador de resultados de Google parametrizado
            </p>
          </div>
          
          <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-xl p-8">
            <SearchBar
              query={query}
              setQuery={setQuery}
              country={country}
              setCountry={setCountry}
              language={language}
              setLanguage={setLanguage}
              onSearch={() => handleSearch(1)}
              loading={loading}
            />
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}

          {results && (
            <SearchResults
              results={results.items}
              searchInformation={results.searchInformation}
              queries={results.queries}
              onPageChange={handlePageChange}
              currentStartIndex={startIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;