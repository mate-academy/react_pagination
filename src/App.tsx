import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => n);

const selectOptions = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const setPerPageCount = (event: ChangeEvent<HTMLSelectElement>): void => {
    const newValue = +event.target.value;

    setPerPage(newValue);
    setCurrentPage(1);
  };

  const startItem = (currentPage - 1) * perPage;
  const lastItem = (startItem + perPage) > items.length
    ? items.length : startItem + perPage;

  const visibleItems = [...items].slice(startItem, lastItem);

  const setPage = (newPage: number) => {
    if (
      newPage >= 1
      && newPage <= Math.ceil(items.length / perPage)
      && newPage !== currentPage
    ) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem + 1} - ${lastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={setPerPageCount}
            value={perPage}
          >
            {
              selectOptions.map(opt => <option value={opt}>{opt}</option>)
            }
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
        onPageChange={setPage}
      />
      <ul>
        {
          visibleItems
            .map(item => <li key={item} data-cy="item">{`Item ${item}`}</li>)
        }
      </ul>
    </div>
  );
};

export default App;
