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
  http.get(`${API_BASE_URL}/character/:id`, ({ params }) => {
    const { id } = params;

    if (id === '404') {
      return HttpResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      {
        id: Number(id),
        name: 'Rick Sanchez',
        species: 'Human',
        status: 'Alive',
        gender: 'Male',
        image: 'https://example.com/image.jpg',
        location: { name: 'Earth', url: 'https://example.com/location' },
      },
      { status: 200 }
    );
  }),
];
