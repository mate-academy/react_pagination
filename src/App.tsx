import { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42);
const TOTAL_ITEMS = items.length;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, TOTAL_ITEMS);

  const visiblePages = Math.ceil(TOTAL_ITEMS / perPage);

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+e.currentTarget.value);
    setCurrentPage(1);
  };

  const handlePageClick = (page: number) => setCurrentPage(page);

  const handlePrevClick = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleNextClick = () =>
    currentPage < visiblePages && setCurrentPage(currentPage + 1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${TOTAL_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePageChange}
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
        visiblePages={visiblePages}
        currentPage={currentPage}
        onPageClick={handlePageClick}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />

      <ul>
        {items.slice(firstItem - 1, lastItem).map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
