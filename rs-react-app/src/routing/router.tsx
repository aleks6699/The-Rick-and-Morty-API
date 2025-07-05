import { createBrowserRouter } from 'react-router';
import App from '../App';
import { NotFound } from '../components/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
