import React, { useState } from 'react';
import './App.css';
import { Pagination } from './Pagination';

const App: React.FC = () => {
  const [total, setTotal] = useState(42);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const onPageChange = (num:number): void => {
    setPage(num);
  };

  const onInputSetTotal = (num:number): void => {
    if (!num) {
      setTotal(42);

      return;
    }

    setTotal(num);
  };

  const onPerPageChange = (num:number): void => {
    setPerPage(num);
  };

  return (
    <nav>
      <Pagination
        total={total}
        perPage={perPage}
        page={page}
        onPageChange={onPageChange}
        onInputSetTotal={onInputSetTotal}
        onPerPageChange={onPerPageChange}
      />
    </nav>
  );
};

export default App;
