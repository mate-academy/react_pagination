import React, { useState, useMemo } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const items = useMemo(() => getNumbers(1, 42).map((n) => `Item ${n}`), []);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (+e.target.value !== currentPage) {
      setCurrentPage(1);
      setPerPage(+e.target.value);
    }
  };

  const firstItemIndex = perPage * currentPage - perPage;
  const lastItemIndex = perPage * currentPage;

  const visibleItems = useMemo(() => {
    return items.slice(firstItemIndex, lastItemIndex);
  }, [items, currentPage, perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemIndex + 1} - ${Math.min(
          lastItemIndex,
          items.length,
        )} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleOnChange}
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
      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {visibleItems.map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { App };
