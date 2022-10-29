import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const pages = Math.ceil(items.length / perPage);

  const onPageChange = (number: number) => {
    setCurrentPage(number);
  };

  const showItems = (values: string[] | number[]) => {
    let showValues = values.slice(0, currentPage - 1);

    if (currentPage < pages) {
      showValues = values.slice(
        (currentPage - 1) * perPage,
        perPage * currentPage,
      );
    }

    if (currentPage === pages) {
      showValues = values.slice((currentPage - 1) * perPage, values.length);
    }

    return showValues;
  };

  const visibleItems = showItems(items);
  const itemsFromTo = showItems(getNumbers(1, items.length));
  const firstNumber = itemsFromTo[0];
  const lastNumber = itemsFromTo[itemsFromTo.length - 1];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstNumber} - ${lastNumber} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(el) => {
              setPerPage(Number(el.target.value));
              setCurrentPage(1);
            }}
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
        onPageChange={onPageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
