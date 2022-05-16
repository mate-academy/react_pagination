import React, { useState } from 'react';
import './App.css';
import Pagination from './Pagination';

const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const onPageChange = (pageNumber: number) => {
    setSelectedPage(pageNumber);
  };

  const onPerPageChange = (count: number) => {
    setPerPage(count);
  };

  return (
    <div className="App">
      <Pagination
        total={42}
        perPage={perPage}
        page={selectedPage}
        onPageChange={onPageChange}
        siblingCount={1}
        withInfo
        onPerPageChange={onPerPageChange}
      />
    </div>
  );
};

export default App;
