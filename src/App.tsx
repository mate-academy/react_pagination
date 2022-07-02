import {
  FC, useCallback, useState,
} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Pagination } from './components/Pagination';

import './App.css';

const App:FC = () => {
  const [page, setCurrPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalPages = 42;
  const navigate = useNavigate();

  const onPageChange = useCallback((newCurrPage: number) => {
    setCurrPage(newCurrPage);
  }, [page, perPage]);

  const onPerPageChange = useCallback((newPerPage: number) => {
    setPerPage(newPerPage);
    navigate('/');
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
