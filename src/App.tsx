import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const total = 42;

export const App: React.FC = () => {
  const [pageCur, setPage] = useState(1);
  const [itemsPerPage, setItems] = useState(5);
  const startIndex = (pageCur - 1) * itemsPerPage + 1;
  const endIndex = (startIndex + (itemsPerPage - 1)) > total
    ? total : (startIndex + (itemsPerPage - 1));
  const items = getNumbers(startIndex, endIndex)
    .map(n => `Item ${n}`);

  const setCurPage = (page:number) => {
    setPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${pageCur} (items ${startIndex} - ${endIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => {
              setItems(+event.target.value);
              setCurPage(1);
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={itemsPerPage}
        currentPage={pageCur}
        onPageChange={setCurPage}
      />
      <ul>
        {
          items.map(item => (
            <li data-cy="item" key={item}>{item}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
