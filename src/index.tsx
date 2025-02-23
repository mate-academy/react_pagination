import { createRoot } from 'react-dom/client';

import { App } from './App';

// eslint-disable-next-line import/no-extraneous-dependencies
import { HashRouter as Root } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Root>
    <App />
  </Root>,
);
