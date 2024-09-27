import { createRoot } from 'react-dom/client';

//import 'bulma/css/bulma.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
