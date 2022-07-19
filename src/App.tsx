import React, { useState } from 'react';
import Pagination from './components/Pagination';
import './App.scss';

const App: React.FC = () => {
  const [total, setTotal] = useState(42);
  const [perPage, setPerPage] = useState(5);
  const [page, choosePage] = useState(1);

  const onPageChange = (value: number, atrName: string) => {
    if (atrName === 'total') {
      setTotal(value);
    }

    if (atrName === 'perPage') {
      setPerPage(value);
    }

    if (atrName === 'page') {
      choosePage(value);
    }
  };

  return (
    <div className="App">
      <Pagination
        total={total}
        perPage={perPage}
        page={page}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default App;
