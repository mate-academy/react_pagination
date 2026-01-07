import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

/*  [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "Item 6",
  "Item 7",
  "Item 8",
]
*/
enum ValueSelected {
  Three = '3',
  Five = '5',
  Ten = '10',
  Twenty = '20',
}


export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const total = 42;


  const startIndex = (currentPage - 1) * perPage;
  // const endIndex = startIndex + perPage;
  const a = total > 0 ? startIndex + 1 : null;
  const b = Math.min(startIndex + perPage, total);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} ` + `(items ${a} - ${b} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              setPerPage(Number(e.target.value as ValueSelected));
              setCurrentPage(1);
            }}
          >
            <option value={ValueSelected.Three}>3</option>
            <option value={ValueSelected.Five}>5</option>
            <option value={ValueSelected.Ten}>10</option>
            <option value={ValueSelected.Twenty}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={42}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => {
          setCurrentPage(page);
        }}

      />
       <ul>
        {items.slice(startIndex, perPage + startIndex).map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
          // retorna um array de listas
        ))}
      </ul>
    </div>
  );
};

export default App;
