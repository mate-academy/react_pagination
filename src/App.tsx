import React, { useState } from 'react';
import './App.css';
import UsePagination from './hooks/usePagination';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = UsePagination({
    contentPerPage: perPage,
    count: 42,
  });
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+e.target.value);
    setPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${firstContentIndex + 1} - ${lastContentIndex < 42 ? lastContentIndex : 42} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelect}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        nextPage={nextPage}
        prevPage={prevPage}
        setPage={setPage}
        totalPages={totalPages}
        page={page}
      />

      <ul>
        {items.slice(firstContentIndex, lastContentIndex).map(el => (
          <li key={el} data-cy="item">{`Item ${el}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
