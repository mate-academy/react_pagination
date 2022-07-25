import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const lastElemetOnPage = (currentPage * itemsPerPage) <= items.length
    ? currentPage * itemsPerPage
    : (currentPage - 1) * itemsPerPage + (items.length % itemsPerPage);

  const firstElemetOnPage = (currentPage - 1) * itemsPerPage;

  const handleChangeCurrentPage = (
    event: React.FormEvent<HTMLAnchorElement>,
  ) => {
    const page = event.currentTarget.href.split('#').slice(-1)[0];

    if (page === 'prev') {
      setCurrentPage(currentPage - 1);

      return;
    }

    if (page === 'next') {
      setCurrentPage(currentPage + 1);

      return;
    }

    if (
      currentPage !== Number(page)
      && currentPage >= 1
      && currentPage <= items.length
    ) {
      setCurrentPage(Number(page));
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstElemetOnPage + 1} - ${lastElemetOnPage} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(Number(event.target.value));
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

      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handleChangeCurrentPage}
      />
      <ul>
        {
          items
            .slice(firstElemetOnPage, lastElemetOnPage)
            .map(item => (<li data-cy="item" key={item}>{item}</li>))
        }
      </ul>
    </div>
  );
};

export default App;
