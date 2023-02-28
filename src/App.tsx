import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const itemsPerPage = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const total = items.length;
  const start = (currentPage - 1) * perPage;
  const end = Math.min(currentPage * perPage, total);
  const visibleItems = items.slice(start, end);

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Items with Pagination</h1>

        <p className="lead" data-cy="info">
          {`Page ${currentPage} (items ${start + 1} - ${end} of ${total})`}
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
              {itemsPerPage.map(item => (
                <option value={item} key={item}>{item}</option>
              ))}
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
          {visibleItems.map(item => (
            <li data-cy="item" key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </>

  );
};

export default App;
