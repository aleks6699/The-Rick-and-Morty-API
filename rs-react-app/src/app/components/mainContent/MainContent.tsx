import { PropsWithChildren, Suspense } from 'react';
import { Loading } from '../loading/Loading';
import { rickAndMortyApi } from '@/api/RickAndMortyApi';
import { CardsCharacters } from '../сardsCharacters/CardsCharacters';
import { Pagination } from '../pagination/Pagination';

export async function MainContent({
  searchParams = { search: '', page: '1' },
}: PropsWithChildren<{ searchParams?: { search?: string; page?: string } }>) {
  const { search, page } = searchParams;
  console.log(search, page);

  const charactersPromise = rickAndMortyApi.fetchCharacters(
    search,
    Number(page)
  );

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative pb-20">
      <Suspense fallback={<Loading />}>
        <CardsCharacters charactersPromise={charactersPromise} />
        <Pagination
          currentPage={Number(page)}
          search={search || ''}
          сharactersPromise={charactersPromise}
        />
      </Suspense>
    </main>
  );
}
