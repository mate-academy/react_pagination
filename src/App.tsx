import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ItemsPage } from './Pages';

export const App = () => (
  <Routes>
    <Route path="/">
      <Route index element={<ItemsPage />} />
    </Route>
  </Routes>
);
