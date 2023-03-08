import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [total] = useState(items);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const getFirstRow = (amount: number, position: number) => (
    position * amount + 1
  );

  const getLastRow = (
    amount: number,
    currentPag: number,
    totalAmount: number,
  ) => {
    const lastRow = currentPag * amount + amount;

    return lastRow > totalAmount ? totalAmount : lastRow;
  };

  const changePerPage = (value: string) => {
    setCurrentPage(0);
    setPerPage(+value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage + 1} (items ${getFirstRow(perPage, currentPage)} - ${getLastRow(perPage, currentPage, total.length)} of ${total.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(e) => {
              changePerPage(e.target.value);
            }}
            value={perPage}
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

        <Pagination
          total={total}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default App;
