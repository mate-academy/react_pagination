/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState, useCallback } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const App: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [withInfo, setWithInfo] = useState(false);
  const totalItems = 42;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const onPageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    }, [],
  );
  return (
    <div className="App">

      <h1>Pagination</h1>

      <label htmlFor="withInfo">
        Show additional information:
        {' '}
        <input
          type="checkbox"
          id="withInfo"
          checked={withInfo}
          onChange={(event) => {
            setWithInfo(event.target.checked);
          }}
        />
      </label>

      <label htmlFor="itemsPerPage">
        {'Items per page: '}
        <select
          id="itemsPerPage"
          name="itemsPerPage"
          value={itemsPerPage}
          onChange={(
            event => setItemsPerPage(+event.target.value)
          )}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
        withInfo={withInfo}
      />

    </div>
  );
};

export default App;
