import React, { useState } from 'react';
import './App.css';
import { Item } from './components/Item';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const perPageOptions: number[] = [3, 5, 10, 20];

function getDisplayedItems(
  allItems: string[],
  perPage: number,
  currentPage: number,
) {
  const startIndex = perPage * currentPage - perPage;
  const endIndex = perPage * currentPage;

  return [...allItems].slice(startIndex, endIndex);
}

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const displayedItems = getDisplayedItems(items, perPage, currentPage);

  const total = items.length;
  const firstDisplayed = (currentPage - 1) * perPage + 1;
  const lastDisplayed = currentPage * perPage > total
    ? total
    : currentPage * perPage;

  function handleOptionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  }

  function changePage(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstDisplayed} - ${lastDisplayed} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={handleOptionChange}
          >
            {perPageOptions.map(option => (
              <option value={option} key={option}>{option}</option>
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
        // eslint-disable-next-line react/jsx-no-bind
        onPageChange={changePage}
      />

      <ul>
        {displayedItems.map(item => (
          <Item item={item} key={item} />
        ))}
      </ul>
    </div>
  );
};

export default App;
