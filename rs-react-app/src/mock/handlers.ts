import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../constants/endpoints';

export const handlers = [
  http.get(`${API_BASE_URL}`, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (name === 'error') {
      return HttpResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }

    if (name === 'empty') {
      return HttpResponse.json({ results: [] }, { status: 200 });
    }

    return HttpResponse.json(
      {
        results: [
          {
            id: 1,
            name: name || 'Rick Sanchez',
            species: 'Human',
            status: 'Alive',
            gender: 'Male',
            image: 'https://example.com/image.jpg',
            location: { name: 'Earth', url: 'https://example.com/location' },
          },
        ],
      },
      { status: 200 }
    );
  }),
  http.get(`${API_BASE_URL}/:id`, ({ params }) => {
    const { id } = params;

    if (id === '404') {
      return HttpResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }

    if (id === '500') {
      return HttpResponse.json({ error: 'Server error' }, { status: 500 });
    }

    if (id === 'empty') {
      return HttpResponse.json({}, { status: 200 });
    }
    return HttpResponse.json(
      {
        id: Number(id),
        name: 'Rick Sanchez',
        species: 'Human',
        status: 'Alive',
        gender: 'Male',
        type: '',
        origin: { name: 'Earth (C-137)' },
        location: { name: 'Earth' },
        image: 'https://example.com/image.jpg',
        created: '2017-11-04T18:48:46.250Z',
        url: `https://rickandmortyapi.com/api/character/${id}`,
      },
      { status: 200 }
    );
  }),
];
