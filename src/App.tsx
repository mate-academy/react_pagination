import React, { useState } from 'react';
import { Pagination } from './components/Pagination';
import { ShortPagePagination } from './components/ShortPagePagination';

import './App.css';

const App: React.FC = () => {
  const [totalPage] = useState(42); /* , setTotalPage */
  const [perPage, setPerPage] = useState(3);
  const [currentPage, setCurentPage] = useState(15);
  const [withInfo] = useState(true);
  const [shortView] = useState(true);

  const onPageChange = (selectedPage: number) => {
    if (currentPage !== selectedPage) {
      setCurentPage(selectedPage);
    }
  };

  const changePerPage = (value:number) => {
    if (value !== perPage) {
      setPerPage(value);
    }
  };

  return (
    <>
      <h1>{currentPage}</h1>
      {shortView ? (
        <ShortPagePagination
          total={totalPage}
          page={currentPage}
          onPageChange={onPageChange}
        />
      )
        : (
          <Pagination
            total={totalPage}
            perPage={perPage}
            page={currentPage}
            onPageChange={onPageChange}
            withInfo={withInfo}
            changePerPage={changePerPage}
          />
        )}
    </>
  );
};

export default App;
