import React, { useState } from 'react';
import './App.css';
import { getNumbers, pageValues } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL = 42;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const items = getNumbers(1, TOTAL)
//   .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const lastRendered = selectedPage * perPage <= TOTAL
    ? selectedPage * perPage
    : TOTAL;

  const lastPageIdicator = lastRendered < TOTAL
    ? lastRendered
    : selectedPage * perPage;

  const firstRendered = lastPageIdicator - perPage + 1;

  const renderedItems = getNumbers(firstRendered, lastRendered)
    .map(n => `Item ${n}`);

  const pages = getNumbers(1, Math.ceil(TOTAL / perPage))
    .map(n => n);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event?.target.value);
    setSelectedPage(1);
  };

  const handleClickNext = () => {
    setSelectedPage(current => current + 1);
  };

  const handleClickPrev = () => {
    setSelectedPage(current => current - 1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${firstRendered} - ${lastRendered} of ${TOTAL})`}
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
            {pageValues.map(value => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={pages}
        perPage={perPage}
        currentPage={selectedPage}
        onPageChange={(page) => setSelectedPage(page)}
        items={renderedItems}
        onNext={handleClickNext}
        onPrev={handleClickPrev}
      />
    </div>
  );
};

export default App;
