import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const pageNumber: number[] = [];
  const [itemPerPage, setItemPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNow = (page: number) => setCurrentPage(page);
  const lastIndex = currentPage * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;
  const currentItems = items.slice(firstIndex, lastIndex);

  for (let i = 1; i <= Math.ceil(items.length / itemPerPage); i += 1) {
    pageNumber.push(i);
  }

  const makeSTep = (direction: string) => {
    if (direction === 'back' && currentPage > 1) {
      setCurrentPage(prevState => prevState - 1);
    }

    if (direction === 'forward' && currentPage < pageNumber.length) {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setItemPerPage(Number(event.currentTarget.value));
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page
        {currentPage}
        (
        {currentItems[0]}
        -
        {currentPage !== pageNumber.length
          ? currentItems.length * currentPage
          : items.length}
        of
        {items.length}
        )
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => handleSelect(event)}
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
        items={currentItems}
        pageNumber={pageNumber}
        paginate={pageNow}
        pageNumberBack={currentPage}
        makeStep={makeSTep}
      />
    </div>
  );
};

export default App;
