import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers, TOTAL_ITEMS } from './utils';
import { SELECTOR_OPTIONS } from './constansts';

interface Options {
  itemsArr: string[];
  currentPage: number;
  perPage: number;
}

const items = getNumbers(1, TOTAL_ITEMS).map(n => `Item ${n}`);

function useItems(options: Options) {
  const { itemsArr, currentPage, perPage } = options;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return itemsArr.slice(startIndex, endIndex);
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const itemsInUse = useItems({ itemsArr: items, currentPage, perPage });

  const handlePrePageClick = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const from = perPage * currentPage - perPage + 1;
  const to = Math.min(items.length, currentPage * perPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {from} - {to} of {TOTAL_ITEMS})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePrePageClick}
            value={perPage}
          >
            {SELECTOR_OPTIONS.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={TOTAL_ITEMS}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ul>
        {itemsInUse.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
