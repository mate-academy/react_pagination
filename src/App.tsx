import React, { useMemo, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

enum DefaultPageValues {
  startPage = 1,
  defaultPageSize = 5,
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(DefaultPageValues.startPage);
  const [perPage, setPerPage] = useState(DefaultPageValues.defaultPageSize);
  const firstPageIndex = (currentPage - 1) * perPage;
  const lastPageIndex = firstPageIndex + perPage < items.length
    ? firstPageIndex + perPage
    : items.length;

  // eslint-disable-next-line no-console
  console.log(firstPageIndex, lastPageIndex, perPage);

  const currentTableData = useMemo(() => {
    return items.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstPageIndex + 1} - ${lastPageIndex} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={5}
            onChange={(event) => {
              setPerPage(Number(event?.currentTarget.value));
              setCurrentPage(DefaultPageValues.startPage);
            }}
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(pageNumber: number) => setCurrentPage(pageNumber)}
        itemsArr={currentTableData}
      />
    </div>
  );
};

export default App;
