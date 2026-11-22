import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // lub 'react-router', jeśli z niego importujesz w App

import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
