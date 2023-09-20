import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const potion = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(9);
  const [perPage, setPerPage] = useState(5);

  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  const handlePage = (numberOfPage: number) => setCurrentPage(numberOfPage);

  const handleNewTodoTitle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {` Page ${currentPage} (items ${indexOfFirstPost + 1} - ${Math.min(indexOfLastPost, 42)} of 42)`}
      </p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            id="perPageSelector"
            className="form-control"
            data-cy="perPageSelector"
            value={perPage}
            onChange={(event) => handleNewTodoTitle(event)}
          >
            {potion.map(number => (
              <option key={number} value={number}>
                {' '}
                {number}
                {' '}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={42}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePage}
      />

      <ul>
        {currentPosts.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
