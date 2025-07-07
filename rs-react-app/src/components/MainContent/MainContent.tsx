import { useState } from 'react';
import { useCharactersQuery } from '../../hooks/useCharactersQuery';
import { Outlet } from 'react-router';
import { CardItem } from '../CardItem/CardItem';
import { Pagination } from '../Pagination/Pagination';

export function MainContent({ value }: { value: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { results, loading, error, info } = useCharactersQuery(
    value,
    currentPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading && (
        <div className="flex justify-center mb-8 animate-pulse">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error && (
        <p className="text-red-400 text-center text-xl mb-8 animate-fadeIn">
          {error}
        </p>
      )}
      {!loading && !error && results.length === 0 && (
        <p className="text-gray-400 text-center text-xl mb-8 animate-fadeIn">
          {value
            ? 'No characters found'
            : 'Enter a search term to find characters'}
        </p>
      )}
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
        {results.map((item) => (
          <CardItem key={item.id} {...item} />
        ))}
      </ul>
      {info.pages > 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-3 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Pagination
              currentPage={currentPage}
              totalPages={info.pages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
      <Outlet />
    </main>
  );
}
