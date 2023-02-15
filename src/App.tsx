import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const total = items.length;

  const itemsStart = itemsPerPage * (currentPage - 1) + 1;
  let itemsEnd = 0;

  if (itemsStart + itemsPerPage > total) {
    itemsEnd = total;
  } else {
    itemsEnd = itemsPerPage * currentPage;
  }

  const onHandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setPerPage(+value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page
        {' '}
        {currentPage}
        {' '}
        (items
        {' '}
        {itemsStart}
        {' '}
        -
        {' '}
        {itemsEnd}
        {' '}
        of
        {' '}
        {total}
        )
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={onHandleChange}
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
        items={items}
        total={total}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        from={itemsStart}
        to={itemsEnd}
      />
    </div>
  );
};

export default App;
