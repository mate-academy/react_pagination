import React, { useState } from 'react';
import './App.scss';

import { Pagination } from './components/Pagination';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const onPageChange = (index: number) => {
    setCurrentPage(index);
  };

  const prevPage = () => {
    setCurrentPage((prevIndex) => (prevIndex - 1));
  };

  const nextPage = () => {
    setCurrentPage((prevIndex) => (prevIndex + 1));
  };

  return (
    <div className="app">
      <h1 className="app__title">
        Pagination
      </h1>

      <Pagination
        total={42}
        perPage={perPage}
        page={currentPage}
        onPageChange={onPageChange}
        prevPage={prevPage}
        nextPage={nextPage}
      />

      <form method="get">
        <label className="app__label">
          Items on the page:
          <select
            value={perPage}
            onChange={({ target }) => {
              setPerPage(+target.value);
              setCurrentPage(1);
            }}
            className="app__select"
          >
            <option value="3">
              3
            </option>

            <option value="5">
              5
            </option>

            <option value="10">
              10
            </option>

            <option value="20">
              20
            </option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default App;
