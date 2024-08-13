import React, { useState } from 'react';
import './App.css';
import { PerPageSelector } from './components/PerPageSelector';
import { PER_CHANGE_OPTIONS } from './constants';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { Page } from './components/Page';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(PER_CHANGE_OPTIONS[1]);
  const [currentPage, setcurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / perPage);
  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem =
    currentPage >= totalPages
      ? items.length
      : (currentPage - 1) * perPage + perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${items.length})`}
      </p>
      <div className="form-group row">
        <PerPageSelector
          id="perPageSelector"
          current={perPage}
          perPageOptions={PER_CHANGE_OPTIONS}
          onChange={val => {
            setPerPage(val);
            setcurrentPage(1);
          }}
        />

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => {
          setcurrentPage(page);
        }}
      />

      <Page items={items.slice(firstItem - 1, lastItem)} />
    </div>
  );
};
