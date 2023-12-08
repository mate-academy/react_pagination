import React, { useState } from 'react';
import './App.css';
import { getNumbers, TOTAL_ITEMS, SELECTOR_OPTIONS } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const items = getNumbers(1, TOTAL_ITEMS).map((n) => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const isFirstItem = (currentPage - 1) * itemsPerPage;
  const isLastItem
    = currentPage * itemsPerPage > TOTAL_ITEMS
      ? TOTAL_ITEMS
      : currentPage * itemsPerPage;

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setItemsPerPage(+value);
    setCurrentPage(1);
  };

  const getVisibleItems = items.slice(isFirstItem, isLastItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${isFirstItem + 1} - ${isLastItem} `
          + `of ${TOTAL_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelect}
          >
            {SELECTOR_OPTIONS.map((i) => (
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
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ul>
        {getVisibleItems.map((item) => (
          <li data-cy="item" key={item.replaceAll(' ', '-')}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
