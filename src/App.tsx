import React, { useState } from 'react';
import './App.css';
import Pagination from './Pagination';

const App: React.FC = () => {
  const [content] = useState(43);
  const [perPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (presentPage: number) => {
    setCurrentPage(presentPage);
  };

  const handlePrevBtn = (presentPage: number) => {
    setCurrentPage(presentPage - 1);
  };

  const handleNextBtn = (presentPage: number) => {
    setCurrentPage(presentPage + 1);
  };

  return (
    <>
      <h1>Pagination</h1>
      <Pagination
        total={content}
        perPage={perPage}
        page={currentPage}
        onPageChange={handleClick}
        onPrevBtn={handlePrevBtn}
        onNextBtn={handleNextBtn}
      />
    </>
  );
};

export default App;
