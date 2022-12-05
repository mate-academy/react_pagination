import React, { useCallback, useMemo, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const initialItems = getNumbers(1, 42);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total] = useState(42);

  const changePage = useCallback((page: number) => (
    setCurrentPage(page)
  ), []);

  const itemsOnPage = useCallback((currPage: number, itemsPerPage: number) => {
    const itemStart = itemsPerPage * (currPage - 1);
    const itemEnd = itemStart + itemsPerPage + 1;

    return [...initialItems].filter(i => (
      i > itemStart && i < itemEnd));
  }, []);

  const visibleItems = useMemo(() => {
    return itemsOnPage(currentPage, perPage);
  }, [currentPage, perPage]);

  if (currentPage > Math.ceil(total / perPage)) {
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${visibleItems[0]} - ${visibleItems[visibleItems.length - 1]} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => setPerPage(Number(event.target.value))}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={42}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={
          useCallback((page: number) => changePage(page), [currentPage])
        }
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
