import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import cn from 'classnames';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

type Option = '3' | '5' | '10' | '20';

const options: Option[] = ['3', '5', '10', '20'];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<Option>(options[1]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const amountOfPages = Math.ceil(items.length / Number(perPage));

  const firstIndex = (currentPage - 1) * Number(perPage);
  const lastIndex = firstIndex + Number(perPage);
  const visibleItems = items.slice(firstIndex, lastIndex);
  const lastItemIndex = Math.min(lastIndex, items.length);

  function handleNextPage(index: number) {
    if (index + 1 <= amountOfPages) {
      setCurrentPage(current => current + 1);
    }
  }

  function handlePreviousPage(index: number) {
    if (index - 1 >= 1) {
      setCurrentPage(current => current - 1);
    }
  }

  function handleItemsPerPage(value: Option) {
    setPerPage(value as Option);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstIndex + 1} - ${lastItemIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            defaultValue="5"
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => handleItemsPerPage(event.target.value as Option)}
          >
            {options.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
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
            onClick={() => handlePreviousPage(currentPage)}
          >
            «
          </a>
        </li>
        {[...Array(amountOfPages)].map((_, index) => (
          <li
            className={cn('page-item', { active: currentPage === index + 1 })}
            key={index}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${index + 1}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === amountOfPages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === amountOfPages}
            onClick={() => handleNextPage(currentPage)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
