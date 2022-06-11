import React, { useState } from 'react';
import './App.scss';

import { Pagination } from './components/Pagination';

const App: React.FC = () => {
  const perPages = [3, 5, 10, 20];

  const total = 42;

  const [perPage, setPerPage] = useState(5);

  const handleChange = (number: number) => {
    setPerPage(number);
  };

  return (
    <div className="App">
      <h1 className="App__title">Pagination</h1>
      <Pagination
        total={total}
        onPerPageChange={handleChange}
        perPage={perPage}
        perPages={perPages}
      />
    </div>
  );
};

export default App;
