import React, { useState, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import './App.css';

const totalItems = 42;
const itemsPerPageOptions = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSelector, setPerPageSelector] = useState(5);

  const maxPage = Math.ceil(totalItems / perPageSelector);
  const firstItemOnPage = 1 + (currentPage - 1) * perPageSelector;
  const lastItemOnPage = (currentPage === maxPage)
    ? totalItems
    : currentPage * perPageSelector;

  const handleItemPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setPerPageSelector(+event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page <= 0 || page > maxPage) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p
        className="lead"
        data-cy="info"
      >
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div
          className="
            col-3
            col-sm-2
            col-xl-1"
        >
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPageSelector}
            onChange={(e) => handleItemPerPage(e)}
          >
            {itemsPerPageOptions.map(item => (
              <option
                key={uuidv4()}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <label
          htmlFor="perPageSelector"
          className="col-form-label col"
        >
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perPage={perPageSelector}
        currentPage={currentPage}
        onPageChange={(page) => handlePageChange(page)}
      />
      <ul>
        {getNumbers(firstItemOnPage, lastItemOnPage).map(n => (
          <li
            key={uuidv4()}
            data-cy="item"
          >
            {`Item ${n}`}
          </li>
        ))}
      </ul>
    </div>
  );
};
