import { ChangeEvent, FC, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const itemsTotal = 42;
const itemsPerPageDefault = 5;
const items = getNumbers(1, itemsTotal).map(n => `Item ${n}`);

export const App: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = currentPage * itemsPerPage < itemsTotal
    ? currentPage * itemsPerPage
    : itemsTotal;
  const visibleItems = items.slice(startItem, endItem);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setItemsPerPage(+event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem + 1} - ${endItem} of ${itemsTotal})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleChange}
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
        total={itemsTotal}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy={item}>{ item}</li>
        ))}
      </ul>
    </div>
  );
};
