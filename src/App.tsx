import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { PaginationForm } from './components/PaginationForm/PaginartionForm';
import { Pagination } from './components/Pagination';
import { ContentWindow } from './components/ContentWindow/ContentWindow';
import { getVisibleItems } from './helpers/getVisibleItems';
import { getDiapason } from './helpers/getDiapason';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const total = items.length;
  const [start, end] = getDiapason(total, currentPage, itemsPerPage);
  const visibleItems = getVisibleItems(items, start, end);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${start + 1} - ${end} of ${total})`}
      </p>

      <PaginationForm
        itemsPerPage={itemsPerPage}
        onSettingsChange={handleItemsPerPageChange}
      />

      <Pagination
        total={total}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={changePage}
      />

      <ContentWindow items={visibleItems} />
    </div>
  );
};
