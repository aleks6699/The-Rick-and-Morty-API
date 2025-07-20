import { useCharactersQuery } from '../../hooks/useCharactersQuery';
import { Outlet, useSearchParams, useLocation } from 'react-router';
import { CardItem } from '../CardItem/CardItem';
import { Pagination } from '../Pagination/Pagination';
import { DownloadPopup } from '../DownloadPopup/DownloadPopup';

export function MainContent({ value }: Readonly<{ value: string }>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const currentPage = Number(searchParams.get('page')) || 1;

  const { results, loading, error, info } = useCharactersQuery(
    value,
    currentPage
  );

  const handlePageChange = (newPage: number) => {
    setSearchParams({ search: value, page: newPage.toString() });
  };

  const isCharacterOpen = location.search.includes('id=');
  const handleCloseOutside = (e: React.MouseEvent<HTMLDListElement>) => {
    if (isCharacterOpen && e.target === e.currentTarget) {
      setSearchParams({ search: value, page: currentPage.toString() });
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative pb-20">
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

      <div className={`flex  gap-6`}>
        <div className={`${isCharacterOpen ? 'md:w-2/3' : 'w-full'}`}>
          <ul
            onClick={handleCloseOutside}
            className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7"
          >
            {results.map((item) => (
              <CardItem key={item.id} {...item} />
            ))}
          </ul>
        </div>

        {isCharacterOpen && (
          <div className="md:w-1/3 w-full max-h-[calc(100vh-10rem)] overflow-y-auto">
            <Outlet />
          </div>
        )}
      </div>
      <DownloadPopup />

      {info.pages > 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-700 shadow-lg border-t border-gray-200 py-3 z-10 light:bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Pagination
              currentPage={currentPage}
              totalPages={info.pages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </main>
  );
}
