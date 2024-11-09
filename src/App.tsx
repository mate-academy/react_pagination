import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';

import Pagination from './components/Pagination';
import FormGroup from './components/FormGroup';
import handleCurrentPage from './handlers/handleCurrentPage';
import handleCurrentOption from './handlers/handleCurrentOption';

export const App: React.FC = () => {
  const total: number = +import.meta.env.VITE_PAGES_TOTAL;
  const startPage: number = +import.meta.env.VITE_START_PAGE;
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(startPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageItemsCount = Math.ceil(total / perPage);
  const newParams = new URLSearchParams(searchParams);

  const handlePageNumber = (event: React.MouseEvent<HTMLAnchorElement>) => {
    handleCurrentPage({
      event,
      currentPage,
      pageItemsCount,
      setCurrentPage,
      newParams,
      setSearchParams,
    });
  };

  const fromWhatItem = (currentPage - 1) * perPage + 1;
  let toWhatItem = fromWhatItem + perPage - 1;

  if (toWhatItem > total) {
    toWhatItem = total;
  }

  const handleOptionNumber = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleCurrentOption({
      event,
      setPerPage,
      setCurrentPage,
      newParams,
      setSearchParams,
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        Page {currentPage} (items {fromWhatItem} - {toWhatItem} of {total})
      </p>
      <FormGroup perPage={perPage} handleOptionChange={handleOptionNumber} />
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageNumber}
      />
    </div>
  );
};

export default App;
