import {
  FC, useCallback, useState,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import './App.css';

const App:FC = () => {
  const [page, setCurrPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalPages = 42;

  const onPageChange = useCallback((newCurrPage: number) => {
    setCurrPage(newCurrPage);
  }, [page, perPage]);

  const onPerPageChange = useCallback((newPerPage2: number) => {
    setPerPage(newPerPage2);
    setCurrPage(1);
  }, [perPage, page]);

  return (
    <Routes>
      <Route
        path="/*"
        element={
          (
            <Pagination
              totalPages={totalPages}
              page={page}
              perPage={perPage}
              onPageChange={onPageChange}
              onPerPageChange={onPerPageChange}
              withInfo
            />
          )
        }
      />
    </Routes>
  );
};

export default App;
