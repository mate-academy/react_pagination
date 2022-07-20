import './App.css';
import React, { useState } from 'react';
import { Pagination } from './Pagination';

const App: React.FC = React.memo(() => {
  const [currentPage, changePage] = useState(1);

  return (
    <Pagination
      total={42}
      perPage={5}
      page={currentPage}
      onPageChange={changePage}
    />
  );
});

export default App;
