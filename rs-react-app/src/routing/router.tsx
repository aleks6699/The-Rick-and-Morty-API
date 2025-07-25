import { createBrowserRouter } from 'react-router';
import App from '../App';
import { lazy } from 'react';

const CharacterDetails = lazy(
  () => import('../components/CharacterDetails/CharacterDetails')
);
const AboutPage = lazy(() => import('../pages/About'));
const NotFound = lazy(() => import('../pages/NotFound'));

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
