import React, { useState } from 'react';
import { Pagination } from './components/Pagination';

const App = () => {
  const [total, setTotal] = useState(42);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const handleTotal = (num) => {
    const regexp = /^[0-9]+([,.][0-9]+)?$/g;

    if (regexp.test(num)) {
      setTotal(num);
    }
  };

  return (
    <Pagination
      total={total}
      onTotalChange={handleTotal}
      perPage={perPage}
      onPerPage={setPerPage}
      page={page}
      onPage={setPage}
    />
  );
};

export default App;
