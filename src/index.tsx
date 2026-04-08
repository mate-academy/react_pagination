import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Router>
    <App />
  </Router>,
);
