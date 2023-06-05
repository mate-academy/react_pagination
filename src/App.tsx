import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PaginationPage } from './Pages/PaginationPage';

import './App.css';

export const App: FC = () => {
  return (
    <div className="container">
      <Routes>
        <Route index element={<PaginationPage />} />
      </Routes>
    </div>
  );
};

export default App;
