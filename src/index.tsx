import { createRoot } from 'react-dom/client';
import { App } from './App';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

const rootItem = document.getElementById('root') as HTMLDivElement;

if (rootItem) {
  createRoot(rootItem).render(<RouterProvider router={router} />);
}
