import { createBrowserRouter } from 'react-router';
import App from '../App';
import { NotFound } from '../components/NotFound/NotFound';

import { AboutPage } from '../pages/About';
import { CharacterDetails } from '../components/CharacterDetails/CharacterDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <CharacterDetails />,
      },
    ],
  },

  {
    path: '/about',
    element: <AboutPage />,
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);
