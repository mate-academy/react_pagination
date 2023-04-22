import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    setItems(getNumbers(1, 42).map((n) => `Item ${n}`));
  }, []);

  const handleItemsPerPageChange = useCallback((event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);
  const total = Math.ceil(items.length / itemsPerPage);

  return (
    <>
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">{`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${items.length})`}</p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {[3, 5, 10, 20].map((option) => (
              <option key={`option-${option}`} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <label
          htmlFor="perPageSelector"
          className="col-form-label col"
        >
          Items per page
        </label>
      </div>
      <Pagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        total={total}
      />
      <ul>
        {items.slice(startIndex, endIndex)
          .map((item) => <li data-cy="item">{item}</li>)}
      </ul>
    </>
  );
};
