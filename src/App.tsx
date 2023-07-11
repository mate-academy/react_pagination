import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const items = getNumbers(1, 42)
//   .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const total = 42;
  const [currentPage, setCurrentPage] = useState(1);
  const [amountItem, setAmountItem] = useState(5);
  const firstItemOnPage = amountItem * (currentPage - 1) + 1;
  const lastItemOnPage = Math.min(amountItem * currentPage, total);
  const itemsOnPage = getNumbers(firstItemOnPage, lastItemOnPage);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const hendleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAmountItem(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={amountItem}
            onChange={(event) => hendleChangeOption(event)}
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
        total={total}
        currentPage={currentPage}
        amountItem={amountItem}
        onPageChange={handleChangePage}
      />

      <ul>
        {itemsOnPage.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
