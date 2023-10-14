import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
]);

const element = document.getElementById('root');
// eslint-disable-next-line
const root = createRoot(element!);

root.render(
  <RouterProvider router={router} />,
);
