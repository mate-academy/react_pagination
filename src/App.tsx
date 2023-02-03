import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsToDisplay = items.slice(0, itemsPerPage);
  const [visibleItems, setVisibleItems] = useState(itemsToDisplay);

  const totalItems = items.length;
  const startItem = currentPage * itemsPerPage - itemsPerPage + 1;
  const endItem = Math.min(totalItems, currentPage * itemsPerPage);

  useEffect(() => {
    const newItems = items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );

    setVisibleItems(newItems);
  }, [currentPage, itemsPerPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage}`}
        {` (items ${startItem} - ${endItem} `}
        {`of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(+event.target.value);
              setCurrentPage(1);
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
        total={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
      <ul>
        {visibleItems.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
