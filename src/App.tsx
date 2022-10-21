import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = +itemsPerPage * (currentPage - 1);
  const endIndex = (startIndex + +itemsPerPage) > items.length
    ? startIndex + (items.length % +itemsPerPage)
    : startIndex + +itemsPerPage;

  const visiableItems = items.filter((_item, index) => {
    return index >= startIndex && index < endIndex;
  });

  const handelSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(event.target.value);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => handelSelect(event)}
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
        perPage={+itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => (
          page !== currentPage && setCurrentPage(page)
        )}
      />

      <ul>
        {visiableItems.map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
