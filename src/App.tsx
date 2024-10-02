import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import Pagination from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(5);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const items = getNumbers(1, 42).map(n => `Item ${n}`);
  const totalPages = items.length;
  const selectByLength = [3, 5, 10, 20];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, items.length);

  const paginationText = `Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${items.length})`;

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {paginationText}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handlePerPageChange}
          >
            {selectByLength.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        totalItems={totalPages}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {items.slice(startIndex, endIndex).map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
