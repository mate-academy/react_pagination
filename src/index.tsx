import { createRoot } from 'react-dom/client';

import AppWrapper from './AppWrapper';

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppWrapper />,
);
