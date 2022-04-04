import React, { useState } from 'react';
import { Pagination } from './components/Pagination/Pagination';
import './App.css';

const App: React.FC = () => {
  const [total, setTotal] = useState<number>(42);
  const [perPage, setPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  const onChangePage = (newPage: string) => {
    if (+newPage !== page) {
      setPage(+newPage);
    }
  };

  return (
    <>
      <h1>Pagination</h1>
      <label htmlFor="total">
        Total:
        <input
          id="total"
          type="number"
          value={total}
          min={1}
          onChange={(event) => setTotal(+event.target.value)}
        />
      </label>
      <br />
      <label htmlFor="perPage">
        PerPage:
        <input
          id="perPage"
          type="number"
          value={perPage}
          min={1}
          max={total}
          onChange={(event) => {
            setPerPage(+event.target.value);
            setPage(1);
          }}
        />
      </label>
      <br />
      <label htmlFor="page">
        Total:
        <input
          id="page"
          type="number"
          value={page}
          min={1}
          max={Math.ceil(total / perPage)}
          onChange={(event) => setPage(+event.target.value)}
        />
      </label>
      <Pagination
        total={total}
        perPage={perPage}
        page={page}
        onChangePage={onChangePage}
      />
    </>

  );
};

export default App;
