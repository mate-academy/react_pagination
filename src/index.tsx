import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HashRouter } from 'react-router-dom';

import { App } from './App';
import React from 'react';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
