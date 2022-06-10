import React, { useState } from 'react';
import './App.css';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  const [pageOptions, setPageOptions] = useState({
    total: 42,
    perPage: 5,
    page: 1,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setPageOptions(prev => (
      { ...prev, [name]: +value }
    ));
  }

  function paginate(pageNumber: number) {
    setPageOptions(prev => (
      { ...prev, page: pageNumber }
    ));
  }

  return (
    <div className="container">
      <h1 className="text-primary text-center mb-3">Pagintation</h1>
      <Pagination
        total={pageOptions.total}
        perPage={pageOptions.perPage}
        page={pageOptions.page}
        // eslint-disable-next-line
        handleChange={handleChange}
        // eslint-disable-next-line
        paginate={paginate}
      />
    </div>
  );
};

export default App;
