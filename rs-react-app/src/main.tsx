import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { assertIsHTMLElement } from './utils/asserts/domAsserts.ts';

const rootElement = document.getElementById('root');
assertIsHTMLElement(rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
