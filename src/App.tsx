import React, { ChangeEventHandler, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState('1');

  const handlePerPageSelect: ChangeEventHandler<HTMLSelectElement>
  = (event) => {
    setPerPage(event.target.value);
    setCurrentPage('1');
  };

  const onPageChange = (value: string) => {
    if (value === 'next') {
      setCurrentPage(prev => String(+prev + 1));

      return;
    }

    if (value === 'prev') {
      setCurrentPage(prev => String(+prev - 1));

      return;
    }

    setCurrentPage(value);
  };

  const startIndex = (+currentPage - 1) * +perPage;
  const endIndex = Math.min((startIndex + +perPage), items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageSelect}
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {
          items.slice(startIndex, endIndex).map(item => (
            <li
              key={item}
              data-cy="item"
            >
              {item}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
