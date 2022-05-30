import React, { useState } from 'react';
import './App.css';
import { Pagination } from './Pagination';

const App: React.FC = () => {
  const [total, setTotal] = useState(42);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  return (
    <>
      <h1>Pagination + Shh.. routing coming soon..</h1>
      <Pagination
        total={total}
        perPage={perPage}
        page={page}
        onTotal={setTotal}
        onPerPage={setPerPage}
        onPage={setPage}
      />
    </>
  );
};

export default App;
