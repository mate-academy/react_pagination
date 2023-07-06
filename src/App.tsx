import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42)
  .map(n => `Item ${n}`);

function getPartOfItems(page: number, count: number): number[] {
  const start = (page - 1) * count + 1;
  let end = (page - 1) * count + count;

  if (end > items.length) {
    end = items.length;
  }

  return getNumbers(start, end);
}

type Props = {};

export const App: React.FC<Props> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const partOfItems = getPartOfItems(currentPage, perPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {
          `
            Page ${currentPage} 
            (items ${partOfItems[0]} - 
            ${partOfItems[partOfItems.length - 1]} 
            of ${items.length})
          `
        }
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => setPerPage(+event.target.value)}
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
        onPageChange={(page: number) => setCurrentPage(page)}
      />

      <ul>
        {partOfItems.map(item => (
          <li data-cy="item" key={item}>
            Item
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
