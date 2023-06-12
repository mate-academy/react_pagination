import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentItem, setCurrentItem] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const lastCurrentItem = currentItem + perPage - 1;

  const itemQuantityHandler = (count: number) => {
    setPerPage(count);
    setCurrentItem(1);
  };

  const arrowHandler = (num: number) => {
    setCurrentPage(currentPage + num);
  };

  const changeHandler = (numberOfPage: number) => {
    setCurrentItem(numberOfPage * perPage - perPage + 1);
    setCurrentPage(numberOfPage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page 1 (items ${currentItem} - ${lastCurrentItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPage}
            onChange={e => itemQuantityHandler(+e.target.value)}
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={changeHandler}
        onArrowClick={arrowHandler}
      />
      <ul>
        {items.slice(currentItem - 1, lastCurrentItem).map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
