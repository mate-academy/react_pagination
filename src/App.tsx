import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const generateItems = () => getNumbers(1, 42).map(n => `Item ${n}`);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState('5');

  const items = useMemo(() => generateItems(), []);

  const perPageNum = +perPage;

  const totalPages = useMemo(
    () => Math.ceil(items.length / perPageNum), [items, perPageNum],
  );

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(event.target.value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  const startIndex = currentPage * perPageNum - perPageNum;
  const lastIndex = Math.min(startIndex + perPageNum, items.length);

  const visibleItems = useMemo(
    () => items.slice(startIndex, lastIndex), [items, startIndex, lastIndex],
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${lastIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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
        currentPage={+currentPage}
        onPageChange={handlePageChange}
      />
      <ul>
        {visibleItems.map((item) => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
