import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPageItem, setPerPageItem] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [massageItems, setMassageItems] = useState('1 - 5');

  const onPageChange = (page: number): void => {
    setCurrentPage(page);
    const start: number = page * perPageItem - perPageItem + 1;
    let end: number = start + perPageItem - 1;

    end = end > 42 ? 42 : end;

    setMassageItems(`${start} - ${end}`);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {massageItems} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={event => {
              setPerPageItem(Number(event.target.value));
              setCurrentPage(1);
              setMassageItems(`${1} - ${Number(event.target.value)}`);
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
        total={items}
        perPage={perPageItem}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default App;
