import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

type PerPage = '3' | '5' | '10' | '20';

const three: PerPage = '3';
const five: PerPage = '5';
const ten: PerPage = '10';
const twenty: PerPage = '20';

const totalItems: number = 42;

interface Item {
  id: number;
  title: string;
}

const getEndItem = (
  perPage: number,
  currentPage: number,
  amountItems: number,
): number => {
  if (perPage * currentPage > amountItems) {
    return amountItems;
  }

  return perPage * currentPage;
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<PerPage>(five);
  const startItem = +perPage * currentPage - +perPage + 1;
  const endItem: number = getEndItem(+perPage, currentPage, totalItems);
  const items: Item[] = getNumbers(startItem, endItem).map(n => {
    return { id: n, title: `Item ${n}` };
  });

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setPerPage(event.target.value as PerPage);
              setCurrentPage(1);
            }}
          >
            <option value={three}>3</option>
            <option value={five} selected>
              5
            </option>
            <option value={ten}>10</option>
            <option value={twenty}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        perPage={+perPage}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {items.map(item => (
          <li key={item.id} data-cy="item">
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
