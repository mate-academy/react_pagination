import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map((n, index) => ({ name: `Item ${n}`, id: index }));

export const App: React.FC = () => {
  const [numbersOfPages, setNumbersOfPages] = useState(9);
  const [itemsPerPages, setItemsPerPages] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = Array
    .from({ length: numbersOfPages }, (_, index) => ({ id: index + 1 }));
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = +(event.target.value);

    setItemsPerPages(selectedValue);
    setNumbersOfPages(Math.ceil(items.length / selectedValue));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${((currentPage - 1) * itemsPerPages) + 1} - ${itemsPerPages * currentPage > 42 ? 42 : itemsPerPages * currentPage} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={itemsPerPages}
            onChange={handleSelectChange}
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
        total={pageNumbers}
        perPage={numbersOfPages}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />

      <ul>
        {items.slice((currentPage - 1) * itemsPerPages,
          (currentPage - 1) * itemsPerPages + itemsPerPages)
          .map((item) => (
            <li key={item.id} data-cy="item">{item.name}</li>
          ))}
      </ul>

    </div>
  );
};

export default App;
