import React, { useState } from 'react';
import { Pagination } from './components';

import './App.css';

const App: React.FC = React.memo(() => {
  const [page, setPage] = useState(1);

  return (
    <div className="container">
      <h1>Pagination</h1>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
});

export default App;
