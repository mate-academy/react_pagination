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
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const indexOflastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOflastItem - itemsPerPage;
  const currentItem = itemsLoad.slice(indexOfFirstItem, indexOflastItem);

  const lastItem = Math.min(itemsPerPage * currentPage, itemsLoad.length);
  const firstItem = itemsPerPage * (currentPage - 1) + 1;

  const onPageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${itemsLoad.length})`}
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
        onPageChange={onPageChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
