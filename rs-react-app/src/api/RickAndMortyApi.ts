import { API_BASE_URL } from '../constants/endpoints';
import type { Card, ResponseCharacter } from '../types/types';

export class RickAndMortyApi {
  private readonly baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async handleResponse<T>(response: Response, emptyValue: T): Promise<T> {
    try {
      if (!response.ok) {
        return emptyValue;
      }

      const data: T & { error?: string } = await response.json();

      if (data.error) {
        return emptyValue;
      }

      return data;
    } catch (err) {
      console.error(err);
      return emptyValue;
    }
  }

  async fetchCharacters(
    term = ' ',
    page = 1,
    url = this.baseUrl
  ): Promise<ResponseCharacter> {
    const empty: ResponseCharacter = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
    const response = await fetch(`${url}?name=${term.trim()}&page=${page}`);
    return this.handleResponse<ResponseCharacter>(response, empty);
  }

  async fetchCharacterById(
    id: number,
    signal?: AbortSignal,
    url = this.baseUrl
  ): Promise<Card | null> {
    const response = await fetch(`${url}/${id}`, { signal });

    return this.handleResponse<Card | null>(response, null);
  }
}

export const rickAndMortyApi = new RickAndMortyApi();
