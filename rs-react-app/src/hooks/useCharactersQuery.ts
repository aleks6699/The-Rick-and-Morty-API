import { useEffect, useState } from 'react';
import { rickAndMortyApi } from '../api/RickAndMortyApi';
import type { MainContentState } from '../types/types';
import { useSearchParams } from 'react-router';

const initialState: MainContentState = {
  results: [],
  loading: false,
  error: '',
  info: { count: 0, pages: 0, next: null, prev: null },
};
export function useCharactersQuery(value: string, page = 1) {
  const [state, setState] = useState(initialState);
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || page;
  const searchValue = searchParams.get('search') || value;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: '' }));

        const data = await rickAndMortyApi.fetchCharacters(
          searchValue,
          controller.signal,
          currentPage
        );

        if (!controller.signal.aborted) {
          setState({
            results: data.results,
            info: data.info,
            loading: false,
            error: '',
          });
        }
      } catch (error) {
        if (!controller.signal.aborted && error instanceof Error) {
          setState({
            results: [],
            info: { count: 0, pages: 0, next: null, prev: null },
            loading: false,
            error: error.message,
          });
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [searchValue, currentPage]);

  return state;
}
