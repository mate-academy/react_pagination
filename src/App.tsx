import React, { useState } from 'react';
import cn from 'classnames';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type PropsPagination = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: () => void;
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const total = 42;
  const items = getNumbers(1, total);
  const totalPages = Math.ceil(items.length / perPage);
  const totalPagesArr = getNumbers(1, totalPages);

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  }

  function handleClick(page: number) {
    setCurrentPage(page);
  }

  function showSubtitle(): string {
    if (currentPage === totalPages) {
      return `Page ${currentPage} (items ${indexOfFirstItem + 1} - ${items[items.length - 1]} of ${total})`;
    }

    return `Page ${currentPage} (items ${indexOfFirstItem + 1} - ${indexOfLastItem} of ${total})`;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {showSubtitle()}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelectChange}
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

      {/* Move this markup to Pagination */}
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => handleClick(currentPage - 1)}
          >
            «
          </a>
        </li>
        {totalPagesArr.map(p => (
          <li
            className={cn('page-item', { active: currentPage === p })}
            key={p}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${p}`}
              onClick={() => handleClick(p)}
            >
              {p}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', { disabled: currentPage === totalPages })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={() => handleClick(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {currentItems.map(n => (
          <li data-cy="item" key={n}>{`Item ${n}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
