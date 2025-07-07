import { createBrowserRouter } from 'react-router';
import App from '../App';
import { NotFound } from '../components/NotFound/NotFound';
import { About } from '../pages/About';
import { ButtonError } from '../components/ButtonError/ButtonError';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: '/hero', element: <ButtonError forceError={false} /> }],
  },

  {
    path: '/about',
    element: <About />,
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);
