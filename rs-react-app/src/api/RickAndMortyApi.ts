import { API_BASE_URL } from '../constants/endpoints';
import type { Card, ResponseCharacter } from '../types/types';

export class RickAndMortyApi {
  private baseUrl: string;
  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }
  async handleResponse<T>(
    response: Response,
    errorMessage: string = 'Character not found'
  ): Promise<T> {
    if (!response.ok) {
      throw new Error(errorMessage);
    }
    const data = await response.json();
    if (data.error) {
      throw new Error(errorMessage);
    }
    if (!data.results) {
      throw new Error('No results found');
    }
    if (!Array.isArray(data.results)) {
      return data;
    }

    return data;
  }
  async fetchCharacters(
    term = '',
    signal: AbortSignal,
    page = 1,
    url = this.baseUrl
  ): Promise<ResponseCharacter> {
    const response = await fetch(`${url}?name=${term}&page=${page}`, {
      signal,
    });
    const data = await this.handleResponse<ResponseCharacter>(response);
    console.log(data);

    return data;
  }
  async fetchCharacterById(
    id: number,
    url = this.baseUrl,
    signal: AbortSignal
  ): Promise<Card> {
    const response = await fetch(`${url}/${id}`, {
      signal,
    });
    return await this.handleResponse<Card>(response);
  }
}

export const rickAndMortyApi = new RickAndMortyApi();
