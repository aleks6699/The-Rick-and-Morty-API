import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { assertIsHTMLElement } from './utils/asserts/domAsserts.ts';
import { RouterProvider } from 'react-router/dom';
import { router } from './routing/router.tsx';

const rootElement = document.getElementById('root');
assertIsHTMLElement(rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
