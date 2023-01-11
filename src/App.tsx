import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsLoad] = useState(items);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const indexOflastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOflastItem - itemsPerPage;
  const currentItem = itemsLoad.slice(indexOfFirstItem, indexOflastItem);

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(prev => prev + 1);
  const prevPage = () => setCurrentPage(prev => prev - 1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem + 1} - ${lastItem} of ${itemsLoad.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleChange}
            value={itemsPerPage}
          >
            <option value={3}>3</option>
            <option value={5} selected>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={itemsLoad.length}
        itemsLoad={currentItem}
        itemsPerPage={itemsPerPage}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default App;
