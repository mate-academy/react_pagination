import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [allItems] = useState(items);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const pagesQuantity = Math.ceil(allItems.length / itemsPerPage);

  const fistItemInPage = activePage * itemsPerPage - itemsPerPage + 1;
  const lastItemInPage = activePage * itemsPerPage > allItems.length
    ? allItems.length
    : activePage * itemsPerPage;

  const itemsOnCurrentPage = getNumbers(fistItemInPage, lastItemInPage);

  const handleChangePage = (page: number) => {
    const isActive = page === activePage;

    if (!isActive) {
      setActivePage(page);
    }
  };

  const handleNextPage = (page: number) => {
    const isLastPage = page === pagesQuantity;

    if (!isLastPage) {
      setActivePage(page + 1);
    }
  };

  const handlePrevPage = (page: number) => {
    const isFirstPage = page === 1;

    if (!isFirstPage) {
      setActivePage(page - 1);
    }
  };

  const handleChangeItemsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));
    setActivePage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activePage} (items ${fistItemInPage} - ${lastItemInPage} of ${allItems.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleChangeItemsPerPage}
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
        pagesQuantity={pagesQuantity}
        activePage={activePage}
        itemsOnCurrentPage={itemsOnCurrentPage}
        onPageChange={handleChangePage}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />

    </div>
  );
};

export default App;
