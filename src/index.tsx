import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom'; // Юзаємо HashRouter
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Router>
    <App />
  </Router>,
);
