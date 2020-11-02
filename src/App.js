import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { Select } from './components/Select';

const App = () => {
  const [state, setState] = useState({
    totalItems: 42,
    perPage: 5,
    page: 1,
  });

  const onPageChange = (targetPage) => {
    if (state.page === targetPage) {
      return;
    }

    setState(prevState => ({
      ...prevState,
      page: targetPage,
    }));
  };

  const onPerPageChange = (newPerPage) => {
    setState(prevState => ({
      ...prevState,
      page: 1,
      perPage: newPerPage,
    }));
  };

  const makeInfo = () => {
    const { totalItems, perPage, page } = state;
    const fromItem = ((page * perPage) - perPage) + 1;
    const toItem = (page * perPage) > totalItems ? totalItems : page * perPage;

    return `${fromItem} - ${toItem} of ${totalItems}`;
  };

  return (
    <>
      <h1 className="text-center mt-3">Pagination</h1>
      <p className="text-center">{makeInfo()}</p>
      <Select
        onPerPageChange={onPerPageChange}
        perPage={state.perPage}
      />
      <Pagination
        {...state}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default App;
