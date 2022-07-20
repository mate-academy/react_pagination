import React, { useEffect, useState } from 'react';
import './App.css';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [total] = useState(42);
  const [inf, setInf] = useState(`${1}-${perPage} of ${total}`);

  const onPageChange = (pageFromComponent: number) => {
    setPage(pageFromComponent);
  };

  const onPerPageChange = (perPageFromComponent: number) => {
    setPerPage(perPageFromComponent);
  };

  const info = () => {
    for (let i = 1; i < total; i += 1) {
      const start = page * perPage - (perPage - 1);
      const finish = ((page * perPage) < total) ? page * perPage : total;

      setInf(`${start}-${finish} of ${total}`);
    }
  };

  useEffect(() => {
    info();
  });

  return (
    <div>
      <h1>Pagination</h1>
      <Pagination
        total={total}
        perPage={perPage}
        page={page}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
        withInfo={inf}
      />
      <p>
        page

        {page}
      </p>
    </div>
  );
};

export default App;
