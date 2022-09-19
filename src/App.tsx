import React, { useState } from 'react';
import {
  Routes, Route, Navigate, useSearchParams,
} from 'react-router-dom';
import { Pagination } from './components/Pagination';
import { Page } from './components/Page';
import { ShortPagePagination } from './components/ShortPagePagination';

import './App.css';

const App: React.FC = () => {
  const [totalPage] = useState(42);
  const [withInfo] = useState(true);
  const [shortView] = useState(false);

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '5';

  const updateSearch = (params: { [key: string]: string }) => {
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value);
    });
  };

  return (
    <>
      <h1>Pagination</h1>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to={`/${currentPage}`} replace />} />
          <Route path=":page" element={<Page />} />
        </Route>
      </Routes>
      {shortView ? (
        <ShortPagePagination
          total={totalPage}
          page={+currentPage}
          updateSearch={updateSearch}
          perPage={+perPage}
        />
      )
        : (
          <Pagination
            total={totalPage}
            perPage={+perPage}
            page={+currentPage}
            withInfo={withInfo}
            updateSearch={updateSearch}
          />
        )}
    </>
  );
};

export default App;
