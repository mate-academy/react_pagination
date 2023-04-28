import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
// eslint-disable-next-line import/no-cycle
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const firstIndex = (currentPage - 1) * itemPerPage;
  const lastIndex = firstIndex + itemPerPage;
  const lastItemIndex = Math.min(lastIndex, items.length);

  const selectOptions = [3, 5, 10, 20];

  const handleChangeItemsPerPage
  = (ev: React.FormEvent<HTMLSelectElement>) => {
    setItemPerPage(+ev.currentTarget.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstIndex + 1} - ${lastItemIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemPerPage}
            onChange={handleChangeItemsPerPage}
          >
            {selectOptions.map(option => (
              <option
                value={option}
                key={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={items.length}
        perPage={itemPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        firstItemIndex={firstIndex}
        lastItemIndex={lastItemIndex}
      />
    </div>
  );
};

export default App;
