import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);
  // const [classActive, setClassActive] = useState(false);
  // const [list, setList] = useStaste(items);

  const indexOfLastPost = currentPage * postPerPage; // 1*5= 5/ 2*5 = 10/ 3*5 = 15
  const indexOfFirstPost = indexOfLastPost - postPerPage; // 15 - 5 = 10/ 10 - 5 = 5
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  //   if(indexOfLastPost => 9) {
  //     indexOfLastPost - 3
  //  }
  //  indexOfLastPost

  // change page
  const onPageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
    // setClassActive(true);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} `}
        {`(items ${indexOfFirstPost + 1} - ${indexOfLastPost} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
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

      <Pagination
        currentPage={currentPage}
        total={42} // total number of items to onPageChange
        postPerPage={5} // number of items per page
        // currentPage={1} /* optional with 1 by default */
        // onPageChange={(page) => { ... }}
        onPageChange={onPageChange}
        setCurrentPage={setCurrentPage}
        // classActive={classActive}
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
