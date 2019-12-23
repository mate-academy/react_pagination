import React, { useState } from 'react';
import './App.css';
import Pagination from './Pagination';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [total] = useState(129);
  const [perPage, setPerPage] = useState(10);

  const handleChangePerPage = (event) => {
    setPerPage(event.target.value);
    setCurrentPage(1);
  };

  const changePage = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="App">
      <p>{`Current Page ${currentPage}`}</p>
      <select onChange={handleChangePerPage}>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="25">25</option>
      </select>
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
