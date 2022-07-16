import React, { useState } from 'react';

import './App.css';

import Pagination from './Pagination';

const App: React.FC = () => {
  const [itemsAmount] = useState(42);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const updatePages = (newPage: number, newPerPage: number = perPage) => {
    const pageAmount = Math.ceil(itemsAmount / newPerPage);

    setCurrentPage(
      Math.max(Math.min(pageAmount, newPage), 1),
    );

    setPerPage(newPerPage);
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = Number(event.currentTarget.value);

    if (value === currentPage) {
      return;
    }

    updatePages(value);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(event.target.value);

    updatePages(currentPage, newPerPage);
  };

  return (
    <div className="container mt-5">
      <div className="position-absolute top-50 start-50 translate-middle">
        <Pagination
          total={itemsAmount}
          perPage={perPage}
          page={currentPage}
          withInfo
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      </div>
    </div>
  );
};

export default App;
