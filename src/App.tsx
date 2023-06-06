import { Route, Routes } from 'react-router-dom';
import { PaginationPage } from './Pages/PaginationPage';

import './App.css';

export const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route index element={<PaginationPage />} />
      </Routes>
    </div>
  );
};
