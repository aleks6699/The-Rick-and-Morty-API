import { useQuery } from '@tanstack/react-query';
import { rickAndMortyApi } from '../api/RickAndMortyApi';

export const useCharacterById = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: ({ signal }) =>
      rickAndMortyApi.fetchCharacterById(Number(id), signal),
  });
};

export const useCharactersList = (page: number, name: string) => {
  return useQuery({
    queryKey: ['characters', page, name],
    queryFn: ({ signal }) =>
      rickAndMortyApi.fetchCharacters(signal, name, page),
  });
};
