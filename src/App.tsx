import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState('1');

  useEffect(() => {
    setCurrentPage('1');
  }, [perPage]);

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => setPerPage(event.currentTarget.value);

  const getItemsNumber = () => {
    const startItem = +perPage * (+currentPage - 1) + 1;
    let endItem = +perPage * +currentPage;

    if (endItem > 42) {
      endItem = 42;
    }

    return {
      startItem,
      endItem,
    };
  };

  const { startItem, endItem } = getItemsNumber();
  const visibleItems = items.slice(startItem - 1, endItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        Page
        {` ${currentPage} (items ${startItem} - ${endItem} of 42)`}
      </p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelect}
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
        items={visibleItems}
        total={42}
        perPage={perPage}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
