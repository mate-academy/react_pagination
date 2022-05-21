import { FC, useCallback, useState } from 'react';
import { Pagination } from './components/Pagination';
import './App.css';

const App:FC = () => {
  const [page, setCurrPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalPages = 42;

  const onPageChange = useCallback((newCurrPage: number) => {
    setCurrPage(newCurrPage);
  }, [page]);

  const onPerPageChange = useCallback((newPerPage: number) => {
    setPerPage(newPerPage);
  }, []);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setCurrPage(page - 1);
    }
  }, [page]);

  const nextPage = useCallback(() => {
    if (page <= totalPages) {
      setCurrPage(page + 1);
    }
  }, [page, totalPages]);

  return (
    <>
      <h1 className="app-title">Pagination</h1>

      <Pagination
        totalPages={totalPages}
        perPage={perPage}
        page={page}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
        prevPage={prevPage}
        nextPage={nextPage}
        withInfo
      />
    </>
  );
};

export default App;
