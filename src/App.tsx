import React, { useState } from 'react';
import './App.css';
import Pagination from './Pagination';

const App: React.FC = () => {
  const [content] = useState(43);
  const [perPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPage, setMinPageLimit] = useState(0);

  const handleClick = (presentPage: number) => {
    setCurrentPage(presentPage);
  };

  const handlePrevBtn = (presentPage: number) => {
    setCurrentPage(presentPage - 1);

    if ((presentPage - 1) % perPage === 0) {
      setMaxPageLimit(maxPageLimit - perPage);
      setMinPageLimit(minPage - perPage);
    }
  };

  const handleNextBtn = (presentPage: number) => {
    setCurrentPage(presentPage + 1);

    if (presentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + perPage);
      setMinPageLimit(minPage + perPage);
    }
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
        maxLimit={maxPageLimit}
        minLimit={minPage}
      />
    </>
  );
};

export default App;
