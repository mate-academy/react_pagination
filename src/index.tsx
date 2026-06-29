import { createRoot } from 'react-dom/client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter } from 'react-router';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
