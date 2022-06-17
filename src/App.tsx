import React, { useState } from 'react';
import { Pagination } from './components/Pagination';
import './App.scss';

const App: React.FC = () => {
  const [page, setPage] = useState<number>(10);
  const [perPage, setPerPage] = useState<number>(3);
  const perPageList = [3, 5, 10, 20];
  const withInfo = true;

  const onPageChange = (pageNum: number) => {
    setPage(pageNum);
  };

  const nextPage = () => {
    setPage(prevState => prevState + 1);
  };

  const prevPage = () => {
    setPage(prevState => prevState - 1);
  };

  return (
    <div className="main">
      <Pagination
        total={42}
        perPage={perPage}
        page={page}
        onPageChange={onPageChange}
        nextPage={nextPage}
        prevPage={prevPage}
        withInfo={withInfo}
      />
      <select
        name="perPage"
        className="perPage"
        value={perPage}
        onChange={(e) => {
          onPageChange(1);
          setPerPage(+e.target.value);
        }}
      >
        {perPageList.map(item => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default App;
