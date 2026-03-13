import React from 'react';
import { Pagination } from './components/Pagination';
import './App.css';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// type AppProps = {
//   total: number;
//   perPage: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// }
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = ({}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(5);
  const total = items.length;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {(currentPage - 1) * perPage + 1} -{' '}
        {Math.min(currentPage * perPage, total)} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {items.slice(startIndex, endIndex).map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
