import { Outlet, useSearchParams, useLocation } from 'react-router';
import { CardItem } from '../CardItem/CardItem';
import { Pagination } from '../Pagination/Pagination';
import { DownloadPopup } from '../DownloadPopup/DownloadPopup';
import { useQuery } from '@tanstack/react-query';
import { rickAndMortyApi } from '../../api/RickAndMortyApi';
import { RefreshButton } from '../RefreshButton/RefreshButton';

export function MainContent({ value }: Readonly<{ value: string }>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const currentPage = Number(searchParams.get('page')) || 1;
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['characters', currentPage, value],
    queryFn: ({ signal }) =>
      rickAndMortyApi.fetchCharacters(signal, value, currentPage),
  });

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
      <RefreshButton
        queryKey={['characters', currentPage, value]}
        isFetching={isFetching}
        refetch={refetch}
      />

      {error && (
        <p className="text-red-400 text-center text-xl mb-8 animate-fadeIn">
          {error.message}
        </p>
      )}

      {!isLoading && !error && data?.results.length === 0 && (
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
            {data?.results.map((item) => (
              <CardItem key={item.id} {...item} />
            ))}
          </ul>
        </div>

        {isCharacterOpen && (
          <div className="md:w-1/3 w-full max-h-[calc(100vh-10rem)]">
            <Outlet />
          </div>
        )}
      </div>
      <DownloadPopup />

      {data?.info?.pages && data.info.pages > 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-700 shadow-lg border-t border-gray-200 py-3 z-10 light:bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Pagination
              currentPage={currentPage}
              totalPages={data?.info?.pages || 1}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </main>
  );
}
