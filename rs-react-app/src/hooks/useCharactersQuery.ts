import { useEffect, useState } from 'react';
import type { MainContentState } from '../components/MainContent/MainContent';
import { rickAndMortyApi } from '../api/RickAndMortyApi';

export function useCharactersQuery(value: string) {
  const [controlResponse, setControlResponse] = useState<MainContentState>({
    results: [],
    loading: false,
    error: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    let isCurrent = true;

    const fetchData = async () => {
      setControlResponse({
        results: [],
        loading: true,
        error: '',
      });

      try {
        const data = await rickAndMortyApi.fetchCharacters(value, signal);

        if (isCurrent) {
          setControlResponse({
            results: data,
            loading: false,
            error: '',
          });
        }
      } catch (error) {
        if (isCurrent) {
          if (error instanceof Error && error.name !== 'AbortError') {
            setControlResponse({
              results: [],
              loading: false,
              error: error.message || 'Character not found',
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
  }, [value]);

  return controlResponse;
}
