import React, { useState } from 'react';
import './App.css';
import { items } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const total = items.length;

  const onPageSetup = (page: number, placeEvent: string): void => {
    switch(placeEvent) {
      case 'select':
        setPerPage(page);
        break;
      case 'numberPage':
        setCurrentPage(page);
        break;
    }
  }

  return (
    <Pagination
      total={total}
      perPage={perPage}
      currentPage={currentPage}
      onPageChange={onPageSetup}
    />
  );
};

export default App;
