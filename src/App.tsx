import React, { useState } from 'react';
import { Paginator } from './components/Paginator';
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
      <div className="pgntrcontaiter">
        <label htmlFor="total">
          Total:&nbsp;
          <input
            id="total"
            type="number"
            value={total}
            min={1}
            max={999}
            onChange={(event) => setTotal(+event.target.value)}
          />
        </label>
        <br />
        <label htmlFor="perPage">
          PerPage:&nbsp;
          <input
            id="perPage"
            type="number"
            value={perPage}
            min={1}
            max={total}
            onChange={(event) => {
              setPerPage(+event.target.value || 1);
              setPage(1);
            }}
          />
        </label>
        <br />
        <label htmlFor="page">
          Current:&nbsp;
          <input
            id="page"
            type="number"
            value={page}
            min={1}
            max={Math.ceil(total / perPage)}
            onChange={(event) => setPage(+event.target.value)}
          />
        </label>
        <Paginator
          total={total}
          perPage={perPage}
          page={page}
          onChangePage={onChangePage}
        />
      </div>
    </>

  );
};

export default App;
