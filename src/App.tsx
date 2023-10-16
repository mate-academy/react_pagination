import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const TOTAL_ITEMS = 42;
const SELECTOR_OPTIONS: number[] = [3, 5, 10, 20];

const items = getNumbers(1, TOTAL_ITEMS)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const changeItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (+value !== itemsPerPage) {
      setCurrentPage(1);
      setItemsPerPage(+value);
    }
  };

  const firstItemIndex = (currentPage - 1) * itemsPerPage;
  const lastItemIndex = (currentPage * itemsPerPage > TOTAL_ITEMS
    ? TOTAL_ITEMS
    : currentPage * itemsPerPage);

  const visibleItems = items.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemIndex + 1} - ${lastItemIndex} `
          + `of ${TOTAL_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={changeItemsPerPage}
          >
            {SELECTOR_OPTIONS.map(i => (
              <option value={i} selected={i === itemsPerPage}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={TOTAL_ITEMS}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item.replaceAll(' ', '-')}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
