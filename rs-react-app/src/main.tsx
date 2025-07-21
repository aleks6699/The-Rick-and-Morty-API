import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { assertIsHTMLElement } from './utils/asserts/domAsserts.ts';
import { RouterProvider } from 'react-router/dom';
import { router } from './routing/router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rootElement = document.getElementById('root');
assertIsHTMLElement(rootElement);

const queryClient = new QueryClient();

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
