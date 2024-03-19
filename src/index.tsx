import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/*',
    element: <App />,
  },
]);

const rootItem = document.getElementById('root') as HTMLDivElement;

if (rootItem) {
  createRoot(rootItem).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
