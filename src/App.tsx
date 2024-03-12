import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const lastPostPage = currentPage * perPage;
  const firstPostPage = lastPostPage - perPage;
  const currentPosts = items.slice(firstPostPage, lastPostPage);
  const totalItems = items.length;
  const finalItems = perPage * currentPage;

  const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = e => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {perPage * currentPage - perPage + 1} -{' '}
        {finalItems >= totalItems ? totalItems : finalItems} of {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleChangeSelect}
            value={perPage}
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
        {currentPosts.map(post => (
          <li key={post} data-cy="item">
            {post}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
