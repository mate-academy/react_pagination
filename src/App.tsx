import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

enum PerPage {
  Three = 3,
  Five = 5,
  Ten = 10,
  Twenty = 20,
}

export const App: React.FC = () => {
  const [total] = useState(items.length);
  const [perPage, setPerPage] = useState(PerPage.Five);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const maxPageIndex = currentPage * perPage <= total
    ? currentPage * perPage
    : total;

  const minPageIndex = maxPageIndex !== total || total % perPage === 0
    ? maxPageIndex - perPage
    : maxPageIndex - (total % perPage);

  const visibleItems = getNumbers(minPageIndex, maxPageIndex - 1);

  function handleChangePerPage(e: ChangeEvent<HTMLSelectElement>) {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${minPageIndex + 1} - ${maxPageIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChangePerPage}
          >
            <option value={PerPage.Three}>{PerPage.Three}</option>
            <option value={PerPage.Five}>{PerPage.Five}</option>
            <option value={PerPage.Ten}>{PerPage.Ten}</option>
            <option value={PerPage.Twenty}>{PerPage.Twenty}</option>
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
        onPageChange={handlePageChange}
      />

      <ul>
        {visibleItems.map(index => (
          <li data-cy="item" key={index}>{items[index]}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
