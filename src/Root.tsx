import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>

  </HashRouter>
);
