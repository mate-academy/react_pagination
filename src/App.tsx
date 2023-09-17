import React, { useMemo, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsSize = items.length;

  const calcItems = useMemo(() => {
    const startItem = perPage * currentPage - perPage;
    const endItem = Math.min(startItem + perPage, itemsSize);
    const visibleItem = items.slice(startItem, endItem);

    return { startItem, endItem, visibleItem };
  }, [perPage, currentPage, items]);

  const perPageHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.currentTarget.value));
    setCurrentPage(1);
  };

  const handleCurrentPage = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {
          `Page ${currentPage} `
          + `(items ${calcItems.startItem + 1} - ${calcItems.endItem}`
          + ` of ${itemsSize})`
        }
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPage}
            onChange={perPageHandler}
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
        items={calcItems.visibleItem}
        total={itemsSize}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          handleCurrentPage(page);
        }}
      />
    </div>
  );
};

export default App;
