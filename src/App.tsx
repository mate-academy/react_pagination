import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

import { Query } from './pages/query';

export const App = () => (
  <BrowserRouter>
    <>
      <Routes>
        <Route path="/" element={<Query />} />
      </Routes>
    </>
  </BrowserRouter>
);

export default App;
