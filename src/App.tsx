import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App = () => {
  const [amountOfItems, setAmountOfItems] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState(`Page 1 (items 1 - 5 of ${items.length})`);

  const startItem = currentPage !== 1 ? (currentPage - 1) * amountOfItems : 0;

  const newList = items.slice(startItem, startItem + amountOfItems);

  const total = items.length;

  const handleAmountSelection = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCurrentPage(1); // tests say that it should set 1st page on change of amount
    setAmountOfItems(+event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {info}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={amountOfItems}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => handleAmountSelection(event)}
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
        newList={newList}
        total={total}
        perPage={amountOfItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setInfo={setInfo}
        items={items}
      />
    </div>
  );
};

export default App;
