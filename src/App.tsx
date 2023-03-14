import React, { useState, ChangeEvent } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const amount = 42;
const items = getNumbers(1, amount).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [total] = useState(amount);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const maxEnd = perPage * currentPage;
  const itemEnd = maxEnd > total ? total : maxEnd;
  const itemStart = maxEnd - perPage;

  const onChangeFunc = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(+event.currentTarget.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemStart + 1} - ${itemEnd} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={onChangeFunc}
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {items.slice(itemStart, itemEnd).map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
