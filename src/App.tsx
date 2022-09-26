import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [optionValue, setOptionValue] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(items.length / optionValue);
  let lastIndexList = optionValue * currentPage;
  const firstIndexList = lastIndexList - optionValue;
  const ourList = items.slice(firstIndexList, lastIndexList);

  const pageChange = (page: number) => {
    if (currentPage !== page) {
      setCurrentPage(page);
    }
  };

  if (currentPage === maxPage) {
    lastIndexList = items.length;
  }

  const switchPage = (val: string) => {
    if (val === 'nextLink' && currentPage < maxPage) {
      const newPage = currentPage;

      setCurrentPage(newPage + 1);
    }

    if (val === 'prevLink' && currentPage > 1) {
      const newPage = currentPage;

      setCurrentPage(newPage - 1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setOptionValue(+value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstIndexList + 1} - ${lastIndexList} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={optionValue}
            onChange={handleChange}
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
        total={items.length} // total number of items to paginate
        perPage={optionValue} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={pageChange}
        onSwitchPage={switchPage}
        newItems={ourList}
      />
    </div>
  );
};

export default App;
