import React, { useCallback, useMemo, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { ItemsPerPage } from './types';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const calculateVisibleItems = (perPage: ItemsPerPage, currentPage: number) => {
  const indexLast = +perPage * currentPage;

  return items.slice(indexLast - +perPage, indexLast);
};

const getNumber = (itemText: string): string => {
  return itemText.slice(5);
};

export const App: React.FC = () => {
  const [
    itemsPerPageCount,
    setItemsPerPage,
  ] = useState<ItemsPerPage>(ItemsPerPage.FIVE);
  const [currentPage, setCurrentPage] = useState(1);

  const visibleItems = useMemo(() => {
    return calculateVisibleItems(itemsPerPageCount, currentPage);
  }, [itemsPerPageCount, currentPage]);

  const handlePerPageSelect = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(event.target.value as ItemsPerPage);
    setCurrentPage(1);
  }, []);

  const totalItems = items.length;

  const firstItemOnPage = getNumber(visibleItems[0]);
  const lastItemOnPage = getNumber(visibleItems[visibleItems.length - 1]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPageCount}
            onChange={handlePerPageSelect}
          >
            {Object.values(ItemsPerPage).map((number) => (
              <option
                value={number}
                key={number}
              >
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
        total={totalItems}
        perPage={itemsPerPageCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
