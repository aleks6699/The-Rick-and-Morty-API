import { useEffect, useState } from 'react';
import { rickAndMortyApi } from '../api/RickAndMortyApi';
import type { MainContentState } from '../types/types';

export function useCharactersQuery(value: string, page: number = 1) {
  const [controlResponse, setControlResponse] = useState<MainContentState>({
    results: [],
    loading: false,
    error: '',
    info: { count: 0, pages: 0, next: '', prev: '' },
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let isCurrent = true;

    const fetchData = async () => {
      try {
        setControlResponse((prev) => ({
          ...prev,
          loading: true,
          error: '',
        }));

        const data = await rickAndMortyApi.fetchCharacters(value, signal, page);

        if (isCurrent) {
          setControlResponse({
            results: data.results,
            loading: false,
            error: '',
            info: data.info,
          });
        }
      } catch (error) {
        if (isCurrent) {
          if (error instanceof Error && error.name !== 'AbortError') {
            setControlResponse({
              results: [],
              loading: false,
              error: error.message,
              info: { count: 0, pages: 0, next: null, prev: null },
            });
          }
        }
      }
    };

    fetchData();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [value, page]);

  return controlResponse;
}
