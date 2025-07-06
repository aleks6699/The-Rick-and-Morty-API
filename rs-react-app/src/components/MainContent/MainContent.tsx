import { useEffect, useState } from 'react';
import { CardItem, type Card } from '../CardItem/CardItem';
import { API_BASE_URL } from '../../constants/endpoints';

type Cards = Card[];

type MainContentState = {
  results: Cards;
  loading: boolean;
  error: string;
};
export function MainContent({ searchTerm }: { searchTerm: string }) {
  const [state, setState] = useState<MainContentState>({
    results: [],
    loading: false,
    error: '',
  });

  useEffect(() => {
    fetchData(searchTerm, API_BASE_URL);
  }, [searchTerm]);

  const fetchData = async (term: string, url: string) => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: '',
      results: [],
    }));

    try {
      const response = await fetch(`${url}?name=${term}&page=1`);

      if (!response.ok) {
        throw new Error('Character not found');
      }

      const data = await response.json();

      if (data.error || !data.results) {
        throw new Error('Character not found');
      }

      setState({ results: data.results, loading: false, error: '' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setState((prevState) => {
          return {
            ...prevState,
            error: error.message || 'Character not found',
            loading: false,
          };
        });
      }
    }
  };
  const { results, loading, error } = state;

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
          {searchTerm
            ? 'No characters found'
            : 'Enter a search term to find characters'}
        </p>
      )}

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
        {results.map((item) => (
          <CardItem key={item.id} {...item} />
        ))}
      </ul>
    </main>
  );
}
