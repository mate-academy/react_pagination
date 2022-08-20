import React, { FC, useState, useEffect } from 'react';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import './App.css';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);
const firstItems = items.slice(0, 5);

export const App: FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState<string[]>(firstItems);

  const checkVisibleItems = () => {
    const newItems = [];
    const lastItem = perPage * currentPage;
    const firstItem = lastItem - perPage;

    for (let i = firstItem; i < lastItem; i += 1) {
      newItems.push(items[i]);
    }

    setVisibleItems(newItems);
  };

  useEffect(checkVisibleItems, [currentPage]);

  const onPageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (+value !== perPage) {
      setPerPage(+value);
      setCurrentPage(1);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items 1 - ${perPage} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">

          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChange}
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {visibleItems.map(item => (
          item && (
            <li key={item} data-cy="item">{item}</li>
          )
        ))}
      </ul>

    </div>
  );
};

export default App;
