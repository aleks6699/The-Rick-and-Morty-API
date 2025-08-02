import type { FavoriteItem } from '../store/store';
import { convertToCSV } from '../utils/convertToCSVBlob';

const rickAndMortyData: FavoriteItem[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
];
describe('convertToCSV', () => {
  it('should return data URI with CSV content for Rick and Morty characters', () => {
    const rawCSV =
      'ID;Name;Status;Species;Gender;Image\n' +
      '1;Rick Sanchez;Alive;Human;Male;https://rickandmortyapi.com/api/character/avatar/1.jpeg\n' +
      '2;Morty Smith;Alive;Human;Male;https://rickandmortyapi.com/api/character/avatar/2.jpeg';

    const expectedCSV = 'data:text/csv;charset=utf-8,' + encodeURI(rawCSV);

    const csv = convertToCSV(rickAndMortyData);

    expect(csv).toBe(expectedCSV);
  });
});
