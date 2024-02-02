import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Items = string[];

const items: Items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const numberOfItems: number = items.length;
  const numberOfPages: number = Math.ceil(numberOfItems / perPage);
  const itemPerPage: number[] = [3, 5, 10, 20];
  const itemSliceIndexFrom: number = (currentPage - 1) * perPage;
  const itemSliceIndexTo: number = currentPage * perPage;
  const itemFrom: number = itemSliceIndexFrom + 1;
  const itemTo: number = itemSliceIndexTo > numberOfItems
    ? numberOfItems
    : itemSliceIndexTo;

  const necessaryItems: string[] = items.slice(
    itemSliceIndexFrom,
    itemSliceIndexTo,
  );

  const visibleItems: JSX.Element[] = necessaryItems.map(item => (
    <li
      data-cy="item"
      key={item}
    >
      {item}
    </li>
  ));

  if (currentPage > numberOfPages) {
    setCurrentPage(1);
  }

  const handlePageChange = (nextPageNumber: number) => {
    if (nextPageNumber !== currentPage
        && nextPageNumber <= numberOfPages
        && nextPageNumber >= 1
    ) {
      setCurrentPage(nextPageNumber);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemFrom} - ${itemTo} of ${numberOfItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(e) => setPerPage(+(e.target.value))}
          >
            {itemPerPage.map(item => (
              <option
                value={item}
                key={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={numberOfItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {visibleItems}
      </ul>
    </div>
  );
};

export default App;
