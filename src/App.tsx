import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ItemsList } from './components/ItemsList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const generatePaginationInfo = (
  currentPage: number,
  firstItem: number,
  lastItem: number,
  total: number,
) => {
  return `Page ${currentPage} (items ${firstItem} - ${lastItem} of ${total})`;
};

const total = 42;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, total);

  const itemsPerPage = items.slice(firstItem - 1, lastItem);
  const itemsOnPageSelecting = [3, 5, 10, 20];

  const paginationInfo = generatePaginationInfo(
    currentPage,
    firstItem,
    lastItem,
    total,
  );

  const handleChangePerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = +event.target.value;

    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {paginationInfo}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleChangePerPage}
            value={perPage}
          >
            {itemsOnPageSelecting.map(item => (
              <option
                value={item}
                key={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ItemsList itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default App;
