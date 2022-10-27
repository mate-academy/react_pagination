import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [elements] = useState(items);

  const changeCountOfPages = (countOfItems: number) => {
    const pages = [];
    const countOfPages = Math.ceil(42 / countOfItems);

    for (let i = 0; i < countOfPages; i += 1) {
      pages.push(i + 1);
    }

    return pages;
  };

  const goNext = () => {
    setPage(currentPage => currentPage + 1);
  };

  const goPrev = () => {
    setPage(currentPage => currentPage - 1);
  };

  const onSetPage = (currentPage: number) => {
    setPage(currentPage);
  };

  const startItemPerPage = (page - 1) * itemsPerPage;
  const visibleItems = [...elements].splice(startItemPerPage, itemsPerPage);
  const from = startItemPerPage + 1;
  const to = startItemPerPage + itemsPerPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${from} - ${to > 42 ? 42 : to} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(+e.target.value);
              setPage(1);
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
        currentPage={page}
        changeCountOfPages={changeCountOfPages}
        itemsPerPage={itemsPerPage}
        goNext={goNext}
        goPrev={goPrev}
        onSetPage={onSetPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
