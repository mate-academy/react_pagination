import { createRoot } from 'react-dom/client';

import { WrappedApp } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <WrappedApp />,
);
