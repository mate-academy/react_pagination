import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map((n) => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [startItem, setStartItem] = useState((currentPage - 1) * perPage + 1);
  const [endItem, setEndItem] = useState(currentPage * perPage);

  const onPageChange = (newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
  };

  useEffect(() => {
    setStartItem((currentPage - 1) * perPage + 1);
    setEndItem(currentPage * perPage);
  }, [currentPage, perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${endItem > items.length ? items.length : endItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => {
              setPerPage(+event.target.value);
              setCurrentPage(1);
            }}
            value={perPage}
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
        total={items.length}
        perPage={+perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {items.map((item, i) => {
          const n = i - (currentPage - 1) * perPage;

          if (n >= 0 && n < perPage) {
            return (
              <li key={item} data-cy="item">
                {item}
              </li>
            );
          }

          return null;
        })}
      </ul>
    </div>
  );
};

export default App;
