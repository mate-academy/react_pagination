import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [total, setTotal] = useState(42);
  const [perPage, setPerPage] = useState(5);

  const onPageChange = (num: number) => {
    setSelectedPage(num);
  };

  const onSetTotal = (num: number) => {
    setTotal(num);
  };

  const onPerPageChange = (num: number) => {
    setPerPage(num);
  };

  return (
    <nav>
      <Pagination
        total={total}
        perPage={perPage}
        page={selectedPage}
        onPageChange={onPageChange}
        onSetTotal={onSetTotal}
        onPerPageChange={onPerPageChange}
      />
    </nav>
  );
};

export default App;
