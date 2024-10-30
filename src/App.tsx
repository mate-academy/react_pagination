import React, {useState} from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const total = items.length;
  const pageQuantity = Math.ceil(total / perPage);

  const start = (currentPage - 1) * perPage;
  const end = Math.min(start + perPage, total);
  const currentPageEl = items.slice(start, end);

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= pageQuantity) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} ({start + 1} - {end} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            onChange={(e) => setPerPage(Number(e.target.value))}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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

      <Pagination total={total} perPage={perPage} currentPage={currentPage} onPageChange={onPageChange} />
      <ul>
        {currentPageEl.map((el) => (
          <li data-cy="item" key={el}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
