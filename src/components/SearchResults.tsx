import React from 'react';
import type { SearchResponse, SearchResult } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  searchInformation: SearchResponse['searchInformation'];
  queries: SearchResponse['queries'];
  onPageChange: (startIndex: number) => void;
  currentStartIndex: number;
}

export function SearchResults({ 
  results, 
  queries, 
  onPageChange,
  currentStartIndex 
}: SearchResultsProps) {
  if (!results?.length) return null;

  const currentPage = Math.floor(currentStartIndex / 10) + 1;
  const maxPages = 10; // Limitamos a 10 páginas fijas

  return (
    <div className="w-full max-w-4xl space-y-8">
      <div className="space-y-6">
        {results.map((result, index) => {
          const thumbnail = result.pagemap?.cse_thumbnail?.[0];
          const image = result.pagemap?.cse_image?.[0];
          
          return (
            <div 
              key={result.cacheId || index} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 p-6"
            >
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex gap-4">
                  {(thumbnail || image) && (
                    <div className="flex-shrink-0">
                      <img
                        src={thumbnail?.src || image?.src}
                        alt=""
                        className="w-24 h-24 object-cover rounded-lg"
                        width={thumbnail?.width}
                        height={thumbnail?.height}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h2 
                      className="text-xl font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors duration-200"
                      dangerouslySetInnerHTML={{ __html: result.htmlTitle }}
                    />
                    <div className="text-sm text-emerald-600 dark:text-emerald-400 mt-1 truncate">
                      {result.formattedUrl || result.link}
                    </div>
                    <div 
                      className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: result.htmlSnippet }}
                    />
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center gap-2 pt-4">
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentStartIndex - 10)}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        
        <div className="flex gap-1">
          {Array.from({ length: maxPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange((page - 1) * 10 + 1)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {currentPage < maxPages && queries.nextPage && (
          <button
            onClick={() => onPageChange(currentStartIndex + 10)}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}