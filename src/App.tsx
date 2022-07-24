import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const innerItems = [...items];
  const total = items.length;
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (num: number) => {
    setCurrentPage(num);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${perPage * (currentPage - 1) + 1} - ${perPage * currentPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => {
              return (
                setPerPage(+event.target.value),
                setCurrentPage(1)
              );
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        items={innerItems}
      />
    </div>
  );
};

export default App;

/* <ul className="pagination">
<li className="page-item disabled">
  <a
    data-cy="prevLink"
    className="page-link"
    href="#prev"
    aria-disabled="true"
  >
    «
  </a>
</li>
<li className="page-item active">
  <a data-cy="pageLink" className="page-link" href="#1">1</a>
</li>
<li className="page-item">
  <a data-cy="pageLink" className="page-link" href="#2">2</a>
</li>
<li className="page-item">
  <a data-cy="pageLink" className="page-link" href="#3">3</a>
</li>
<li className="page-item">
  <a data-cy="pageLink" className="page-link" href="#4">4</a>
</li>
<li className="page-item">
  <a data-cy="pageLink" className="page-link" href="#5">5</a>
</li>
<li className="page-item">
  <a data-cy="pageLink" className="page-link" href="#6">6</a>
</li>
<li className="page-item">
  <a data-cy="pageLink" className="page-link" href="#7">7</a>
</li>
<li className="page-item">
  <a data-cy="pageLink" className="page-link" href="#8">8</a>
</li>
<li className="page-item">
  <a data-cy="pageLink" className="page-link" href="#9">9</a>
</li>
<li className="page-item">
  <a
    data-cy="nextLink"
    className="page-link"
    href="#next"
    aria-disabled="false"
  >
    »
  </a>
</li>
</ul> */
