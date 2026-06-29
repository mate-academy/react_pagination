import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const handlePageChange = (newPage: number) => {
  const newParams = new URLSearchParams(searchParams);

  newParams.set('page', newPage.toString());
  setSearchParams(newParams);
};

const handlePerPageChange = (newPerPage: string) => {
  const newParams = new URLSearchParams(searchParams);

  newParams.set('perPage', newPerPage);

  newParams.set('page', '1');

  setSearchParams(newParams);
};


  const totalItems = items.length;
  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, totalItems);

  const currentItems = items.slice(firstItem - 1, lastItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              handlePerPageChange(e.target.value);
            }}
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
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
