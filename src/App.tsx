import React, { useState } from 'react';
import './App.css';
import { calcEndItem, calcPages, calcStartItem } from './utils';
import { Pagination } from './components/Pagination';

const total = 42;

export const App: React.FC = () => {
  const options = [3, 5, 10, 20];

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(options[1]);

  const pagesCount = calcPages(total, perPage);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const startItem = calcStartItem(currentPage, perPage);
  const endItem = calcEndItem(currentPage, perPage, total);

  const info = `Page ${currentPage} (items ${startItem} - ${endItem} of ${total})`;

  const onPageChange = (page: number) => {
    if (page > 0 && page <= pagesCount) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {info}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleChange}
            value={perPage}
          >
            {options.map(option => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default App;
