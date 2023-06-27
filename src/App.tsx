import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items: string[] = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);
  const itemsPerPage = [3, 5, 10, 20];

  const selectPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setSelectedPage(1);
  };

  const handleNextLink = (numberOfPages: number) => {
    setSelectedPage((current => (
      current < numberOfPages
        ? current + 1
        : current
    )));
  };

  const handlePrevLink = () => {
    setSelectedPage((current => (
      current > 1
        ? current - 1
        : current
    )));
  };

  const firstItemIndex = selectedPage * perPage - perPage;
  const lastItemIndex = selectedPage * perPage;

  const selectedPageContent = items.slice(firstItemIndex, lastItemIndex);

  const itemsFrom = firstItemIndex + 1;
  const itemsTo = firstItemIndex + selectedPageContent.length;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${itemsFrom} - ${itemsTo} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={selectPerPage}
          >
            {itemsPerPage.map(number => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={selectedPage}
        onPageChange={setSelectedPage}
        onNextLink={handleNextLink}
        onPrevLink={handlePrevLink}
      />

      <ul>
        {selectedPageContent.map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
