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
    const fetchData = async () => {
      setControlResponse((prevState) => ({
        ...prevState,
        loading: true,
        error: '',
      }));

      try {
        const data = await rickAndMortyApi.fetchCharacters(value, signal);
        setControlResponse((prevState) => ({
          ...prevState,
          results: data,
        }));
      } catch (error: unknown) {
        if (error instanceof Error) {
          setControlResponse((prevState) => ({
            ...prevState,
            error: error.message || 'Character not found',
            results: [],
          }));
        }
      } finally {
        setControlResponse((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [value]);

  return {
    results: controlResponse.results,
    loading: controlResponse.loading,
    error: controlResponse.error,
  };
}
