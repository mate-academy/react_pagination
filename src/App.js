import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Pagination } from './components/Pagination';

const App = () => {
  const [page, setPage] = useState(1);

  // add a form to let the user modify the perPage and total values

  return (
    <div className="App">
      <Pagination
        total={42}
        page={page}
        onPageChange={setPage}
        withInfo
      />
    </div>
  );
};

export default App;
