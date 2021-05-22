import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Pagination } from './components/Pagination';

const App = () => {
  const [total, setTotal] = useState(42);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const updatePage = (newTotal, newPerPage) => {
    const pageCount = Math.ceil(newTotal / newPerPage);

    setPage(page > pageCount ? pageCount : page);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    updatePage(total, newPerPage);
  };

  const handleTotalChange = (newTotal) => {
    setTotal(newTotal);
    updatePage(newTotal, perPage);
  };

  return (
    <div className="App container">
      <Pagination
        total={total}
        onTotalChange={handleTotalChange}
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
        page={page}
        onPageChange={setPage}
        withInfo
      />
    </div>
  );
};

export default App;
