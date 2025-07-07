import { createBrowserRouter } from 'react-router';
import App from '../App';
import { NotFound } from '../components/NotFound/NotFound';

import { ButtonError } from '../components/ButtonError/ButtonError';
import { AboutPage } from '../pages/About';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: '/hero', element: <ButtonError forceError={false} /> }],
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
