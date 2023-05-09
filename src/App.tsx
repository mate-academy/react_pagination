import React, { useState } from 'react';
import './App.css';
// eslint-disable-next-line object-curly-newline
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import { ListPage } from './pages/ListPage/ListPage';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const getCurrentItems = (itemPerPage: number, currentPage: number) => {
  const lastIndex = itemPerPage * currentPage;

  return items.slice(lastIndex - itemPerPage, lastIndex);
};

export const App: React.FC = () => {
  const [itemPerPage, setItemPerPage] = useState(5);
  const navigate = useNavigate();
  const match = useMatch('/:currentPage');
  let currentPage: number;

  if (match?.params.currentPage) {
    currentPage = +match?.params.currentPage;
  } else {
    currentPage = 1;
  }

  const itemAmount = items.length;
  const currentItems = getCurrentItems(itemPerPage, currentPage);
  const firstItemNumber = items.indexOf(currentItems[0]) + 1;
  const lastItemNumber = items
    .indexOf(currentItems[currentItems.length - 1]) + 1;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemPerPage(+event.target.value);

    navigate('/1');
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemNumber} - ${lastItemNumber} of ${itemAmount})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemPerPage}
            onChange={handleSelectChange}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        itemAmount={itemAmount}
        itemsPerPage={itemPerPage}
      />

      <Routes>
        <Route
          path=":currentPage"
          element={<ListPage items={currentItems} />}
        />
      </Routes>
    </div>
  );
};

export default App;
