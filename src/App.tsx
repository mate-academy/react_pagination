import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  const [pageOptions, setPageOptions] = useState({
    total: 42,
  });

  function paginate(pageNumber: number) {
    setPageOptions(prev => (
      { ...prev, page: pageNumber }
    ));
  }

  return (
    <BrowserRouter>
      <div className="container">
        <h1 className="text-primary text-center mb-3">Pagination</h1>
        <Routes>
          <Route
            path="/"
            element={(
              <Pagination
                total={pageOptions.total}
                // eslint-disable-next-line
                setPageOptions={setPageOptions}
                // eslint-disable-next-line
                paginate={paginate}
              />
            )}
          />
          <Route
            path="/:tabId/page=:perTab"
            element={(
              <Pagination
                total={pageOptions.total}
                // eslint-disable-next-line
                setPageOptions={setPageOptions}
                // eslint-disable-next-line
                paginate={paginate}
              />
            )}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
