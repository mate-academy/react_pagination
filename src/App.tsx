import React, {
  useState,
} from 'react';
import { Pagination } from './components/Pagination';

import './App.scss';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const onPageChange = (index: number) => {
    setCurrentPage(index);
  };

  const previousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
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
        previousPage={previousPage}
        nextPage={nextPage}
      />

      <form method="get" className="app__form">
        <label>
          Items on one page:
          <select
            value={perPage}
            onChange={({ target }) => {
              setCurrentPage(1);
              setPerPage(Number(target.value));
            }}
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
