/* eslint-disable import/no-extraneous-dependencies */
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from './components/notFoundPage';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '*', element: <NotFoundPage /> },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
