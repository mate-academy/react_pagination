import React from 'react';
import { useSearchParams } from 'react-router-dom';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const perPageOptions = [3, 5, 10, 20];

export const App: React.FC = () => {
  // const [perPage, setPerPage] = useState(perPageOptions[1]);
  // const [currentPage, setCurrentPage] = useState(1);

  const [pageValues, setPageValues] = useSearchParams();
  const currentPage = Number(pageValues.get('page')) || 1;
  const perPage = Number(pageValues.get('perPage')) || perPageOptions[2];

  const currentPageStart = 1 + perPage * (currentPage - 1);
  const currentPageEnd = Math.min(perPage * currentPage, items.length);

  const handlePageChange = (page: number) => {
    setPageValues(prev => {
      const newParams = new URLSearchParams(prev);

      newParams.set('page', String(page));

      return newParams;
    });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageValues(prev => {
      const newParams = new URLSearchParams(prev);

      newParams.set('page', String(1));
      newParams.set('perPage', String(event.target.value));

      return newParams;
    });
  };

  const pageItems = items.slice(currentPageStart - 1, currentPageEnd);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${currentPageStart} - ${currentPageEnd} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
          >
            {perPageOptions.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <ul>
        {pageItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
