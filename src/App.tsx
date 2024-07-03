import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PerPageSelector } from './components/PerPageSelector';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import './App.css';

const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

const perPageOptions: number[] = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPageFromUrl = Number.parseInt(searchParams.get('perPage') || '');
  const pageFromUrl = Number.parseInt(searchParams.get('page') || '');

  const [perPage, setPerPage] = useState<number>(
    !!perPageFromUrl && perPageFromUrl > 0 ? perPageFromUrl : perPageOptions[1],
  );
  const [currentPage, setCurrentPage] = useState<number>(
    !!pageFromUrl && pageFromUrl > 0 ? pageFromUrl : 1,
  );

  const updatePerPage = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
    setSearchParams({ perPage: newPerPage + '', page: '1' });
  };

  const updatePage = (newPage: number) => {
    setCurrentPage(newPage);

    setSearchParams(params => {
      params.set('page', newPage + '');

      return params;
    });
  };

  const maxPage: number = Math.ceil(items.length / perPage);

  if (maxPage < currentPage) {
    updatePage(maxPage);
  }

  const firstVisibleIndex: number = (currentPage - 1) * perPage;
  const lastVisibleIndex: number =
    firstVisibleIndex + perPage > items.length
      ? items.length
      : firstVisibleIndex + perPage;

  const visibleItems: string[] = items.slice(
    firstVisibleIndex,
    lastVisibleIndex,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} ` +
          `(items ${firstVisibleIndex + 1} - ${lastVisibleIndex} ` +
          `of ${items.length})`}
      </p>

      <PerPageSelector
        options={perPageOptions}
        current={perPage}
        onChange={updatePerPage}
      />

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={updatePage}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
