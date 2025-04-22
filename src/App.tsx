import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [total] = useState<string[]>(items);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const lastIndex = perPage * currentPage;
  const firstIndex = lastIndex - perPage;
  const currentItems = total.slice(firstIndex, lastIndex);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(event.target.value, 10);

    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const onPageChange = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => prev + 1);
  const prevPage = () => setCurrentPage(prev => prev - 1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstIndex + 1} - ${Math.min(lastIndex, total.length)} of ${total.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleOptionChange}
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
        total={total.length}
        currentPage={currentPage}
        perPage={perPage}
        onPageChange={onPageChange}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      <ul>
        {currentItems.map((item, i) => (
          <li data-cy="item" key={i}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
