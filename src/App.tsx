import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  const [pageOptions, setPageOptions] = useState({
    total: 42,
  });

  return (
    <BrowserRouter>
      <div className="container">
        <h1 className="text-primary text-center mb-3">Pagination</h1>
        <Routes>
          <Route
            path="/react_pagination"
            element={(
              <Pagination
                total={pageOptions.total}
                setPageOptions={setPageOptions}
              />
            )}
          />
          <Route
            path="/:tabId/page=:perTab"
            element={(
              <Pagination
                total={pageOptions.total}
                setPageOptions={setPageOptions}
              />
            )}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
