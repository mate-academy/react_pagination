import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

export const App: React.FC = () => {
  const total = 42;
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  function updateItems(page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;
    const from = offset + 1;
    let to = pageSize + offset;

    if (pageSize + offset > total) {
      to = total;
    }

    setItems(getNumbers(from, to));
  }

  const handlePageChange = (page: number) => {
    updateItems(page, perPage);
    setCurrentPage(page);
  };

  function handlePerPageChange(event: ChangeEvent<HTMLSelectElement>) {
    setPerPage(+event.target.value);
    updateItems(1, +event.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${items[0]} - ${items[items.length - 1]} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={handlePerPageChange}
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {items.map((item) => (
          <li data-cy="item" key={item}>{`Item ${item}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
