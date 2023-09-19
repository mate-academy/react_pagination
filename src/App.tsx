import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import { Items } from './components/Items';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const pageFrom = (currentPage - 1) * itemsPerPage + 1;
  const pageTo = pageFrom + itemsPerPage - 1 > 42
    ? items.length
    : pageFrom + itemsPerPage - 1;

  const onPageChange = (page: number) => {
    if (
      page !== currentPage
      && page >= 1
      && page <= Math.ceil(items.length / itemsPerPage)
    ) {
      setCurrentPage(page);
    }
  };

  const visibleItems = () => {
    const itemFrom = itemsPerPage * (currentPage - 1);
    const itemCopy = [...items];

    return itemCopy.splice(itemFrom, itemsPerPage);
  };

  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${pageFrom} - ${pageTo} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={itemsPerPage}
            onChange={(e) => {
              handlePageChange(e);
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
      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <Items visibleItems={visibleItems()} />
    </div>
  );
};
