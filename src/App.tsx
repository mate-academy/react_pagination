import { useState } from 'react';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import './App.css';

export const App: React.FC = () => {
  const [items] = useState<string[]>(getNumbers(1, 42).map((n) => `Item ${n}`));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);
  const total = Math.ceil(items.length / itemsPerPage);

  const handleItemsPerPageChange = (
    { target: { value } }: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(+value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
