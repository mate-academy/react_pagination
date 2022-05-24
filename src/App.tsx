import React, { useState } from 'react';
import './App.scss';
import { Pagination } from './Components/Pagination/Pagination';

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [total, setTotal] = useState(42);

  return (
    <div className="app">
      <h1>Pagination</h1>
      <Pagination
        total={total}
        perPage={perPage}
        page={page}
        onTotal={setTotal}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
      />
    </div>
  );
};

export default App;
