import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [countItems, setCountItems] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * countItems;
  const endIndex = startIndex + countItems;
  const itemsPerPage = items.slice(startIndex, endIndex);

  function paginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(items.length / countItems)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsPerPage[0].split(' ')[1]} - ${itemsPerPage[itemsPerPage.length - 1].split(' ')[1]} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={countItems}
            onChange={(event) => {
              setCountItems(Number(event.target.value));
              setCurrentPage(1);
            }}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={42} // total number of items to paginate
        perPage={countItems} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        paginate={(pageNumber) => paginate(pageNumber)}
        previousPage={previousPage}
        nextPage={nextPage}
      />
      <ul>
        {itemsPerPage.map((item: string) => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
