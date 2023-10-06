import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;

const items = getNumbers(1, TOTAL_ITEMS)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);

  const totalPages = Math.ceil(TOTAL_ITEMS / perPage);

  const firstItemIndex = perPage * selectedPage - (perPage - 1);
  const lastItemIndex = selectedPage === totalPages
    ? TOTAL_ITEMS
    : perPage * selectedPage;

  const currentItems = items.slice(firstItemIndex - 1, lastItemIndex);

  const handlePerPageChange = (
    selectEvent: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(Number(selectEvent.target.value));
    setSelectedPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${firstItemIndex} - ${lastItemIndex} of ${TOTAL_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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
        total={TOTAL_ITEMS}
        perPage={perPage}
        currentPage={selectedPage}
        onPageChange={(nextPage: number) => setSelectedPage(nextPage)}
      />
      <ul>
        {currentItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
