import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const totalPages = 42;

  const indexOfLastPost = currentPage * postPerPage;

  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  let news = indexOfLastPost;

  if (indexOfLastPost > totalPages) {
    news = indexOfLastPost - postPerPage + 2;
  }

  const onPageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  const changeItemsPerPage = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setPostPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} `}
        {`(items ${indexOfFirstPost + 1} - ${news} of ${totalPages})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={postPerPage}
            onChange={changeItemsPerPage}
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
        currentPage={currentPage}
        total={totalPages}
        postPerPage={postPerPage}
        onPageChange={onPageChange}
        setCurrentPage={setCurrentPage}
      />

      <ul>
        {currentPosts.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
