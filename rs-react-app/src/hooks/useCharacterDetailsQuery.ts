import { useEffect, useState } from 'react';
import { rickAndMortyApi } from '../api/RickAndMortyApi';
import type { Card } from '../types/types';
import { API_BASE_URL } from '../constants/endpoints';

type CharacterState = {
  data: Card | null;
  loading: boolean;
  error: string | null;
};

const initialState: CharacterState = {
  data: null,
  loading: false,
  error: null,
};
export function useCharacterDetailsQuery(id: number) {
  const [state, setState] = useState<CharacterState>(initialState);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const data = await rickAndMortyApi.fetchCharacterById(
          id,
          API_BASE_URL,
          controller.signal
        );

        if (!controller.signal.aborted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (!controller.signal.aborted && error instanceof Error) {
          setState({ data: null, loading: false, error: error.message });
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [id]);

  return {
    character: state.data,
    loading: state.loading,
    error: state.error,
    hasData: !!state.data,
  };
}
