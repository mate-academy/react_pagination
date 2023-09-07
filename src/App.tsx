import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';
import { ItemsList } from './components/ItemsList';

enum DefaultPageValues {
  StartPage = 1,
  DefaultPageSize = 5,
  TotalPages = 42,
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(DefaultPageValues.StartPage);
  const [itemsPerPage, setPerPage] = useState(
    DefaultPageValues.DefaultPageSize,
  );
  const startIndex = currentPage * itemsPerPage - itemsPerPage + 1;
  const lastIndex = Math.min(currentPage * itemsPerPage,
    DefaultPageValues.TotalPages);

  const handleItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event?.currentTarget.value));
    setCurrentPage(DefaultPageValues.StartPage);
  };

  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex} - ${lastIndex} of ${DefaultPageValues.TotalPages})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={DefaultPageValues.DefaultPageSize}
            onChange={handleItemsPerPage}
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
        total={DefaultPageValues.TotalPages}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ItemsList
        total={DefaultPageValues.TotalPages}
        perPage={itemsPerPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
