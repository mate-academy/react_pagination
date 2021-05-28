import React, { useState } from 'react';
import { Pagination } from './components/Pagination';

const App = () => {
  const [total, setTotal] = useState(42);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  return (
    <Pagination
      total={total}
      onTotalChange={setTotal}
      perPage={perPage}
      onPerPage={setPerPage}
      page={page}
      onPage={setPage}
    />
  );
};

export default App;
