import React, { useState } from 'react';
import './App.css';
import Pagination from './Pagination';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [total] = useState(56);
  const [perPage] = useState(10);

  const changePage = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="App">
      <p>{`Current Page ${currentPage}`}</p>

      <Pagination
        total={total}
        page={currentPage}
        perPage={perPage}
        changePage={changePage}
      />
    </div>
  );
};

export default App;
