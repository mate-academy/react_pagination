import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * perPage + 1;
  const end = currentPage * perPage > 42 ? 42 : currentPage * perPage;

  function changePage(page: number, lastNumberOfPage: number): void {
    if (page === currentPage || page < 1 || page > lastNumberOfPage) {
      return;
    } else {
      setCurrentPage(page);
    }
  }

  function selectOnChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${start} - ${end} of 42)`}
      </p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={selectOnChange}
            defaultValue="5"
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
        total={getNumbers(1, 42)}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={changePage}
      />
      <ul>
        {items.slice(start - 1, end).map(item => (
          <li data-cy="item" key={items.indexOf(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
