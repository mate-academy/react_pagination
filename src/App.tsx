import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';

function getNumbers(from: number, to: number): number[] {
  const numbers: number[] = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

const items = getNumbers(1, 42);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsToDisplay = currentPage * itemsPerPage;
  const possiblePages = Math.ceil(items.length / itemsPerPage);
  const firstItem: number = ((currentPage - 1) * itemsPerPage) + 1;
  const lastItem: number = Math.min(itemsToDisplay, items.length);

  const setPages = (possiblePage: number): number[] => {
    const numberOfPages: number[] = [];

    for (let i = 1; i <= possiblePage; i += 1) {
      numberOfPages.push(i);
    }

    return numberOfPages;
  };

  const rangeOfItems = (startItem: number, endItem: number): number[] => {
    const numberOfItems: number[] = [];

    for (let i = startItem; i <= endItem; i += 1) {
      numberOfItems.push(i);
    }

    return numberOfItems;
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} Items ${firstItem} - ${lastItem} of 42`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event => {
              setItemsPerPage(+event.target.value);
              setCurrentPage(1);
            })}
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
        possiblePages={setPages(possiblePages)}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        rangeOfItems={rangeOfItems(firstItem, lastItem)}
        maxItem={items.length}
      />

    </div>
  );
};

export default App;
