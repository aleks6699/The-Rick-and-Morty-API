import { PropsWithChildren, Suspense } from 'react';
import { Loading } from '../loading/Loading';
import { rickAndMortyApi } from '@/api/RickAndMortyApi';
import { CardsCharacters } from '../сardsCharacters/CardsCharacters';
import { Pagination } from '../pagination/Pagination';
import { CharacterDetails } from '../characterDetails/CharacterDetails';
import { cn } from '@/utils/class-names';

export async function MainContent({
  searchParams = { search: '', page: '1', id: null },
}: PropsWithChildren<{
  searchParams?: { search?: string; page?: string; id?: string | null };
}>) {
  const { search, page, id } = searchParams;

  const isCharacterOpen = Boolean(id);

  const charactersPromise = rickAndMortyApi.fetchCharacters(
    search,
    Number(page)
  );

  const pages = await charactersPromise.then((res) => res.info.pages);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative pb-20">
      <div className="flex gap-6">
        <div className={cn('w-full', isCharacterOpen && 'md:w-2/3')}>
          <Suspense key={search} fallback={<Loading />}>
            <CardsCharacters charactersPromise={charactersPromise} />
          </Suspense>
        </div>

        {isCharacterOpen && (
          <div className="hidden md:block md:w-1/3 max-h-[calc(100vh-10rem)]">
            <CharacterDetails />
          </div>
        )}
      </div>
      <Pagination
        currentPage={Number(page) || 1}
        search={search || ''}
        pagesAll={pages}
      />
    </main>
  );
}
