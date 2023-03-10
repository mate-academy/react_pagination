import { useState, useEffect } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleList, setVisibleList] = useState(items.slice(0, itemPerPage));

  const total = items.length;
  const startItem = currentPage * itemPerPage - itemPerPage + 1;
  const endItem = currentPage * itemPerPage <= total
    ? currentPage * itemPerPage
    : total;

  useEffect(() => {
    const newListItem = items.slice(
      (currentPage - 1) * itemPerPage,
      currentPage * itemPerPage,
    );

    setVisibleList(newListItem);
  }, [currentPage, itemPerPage]);

  const pageChenge = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page
        {` ${currentPage} `}
        {`(items ${startItem} - ${endItem} of`}
        {` ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemPerPage}
            onChange={(event) => {
              setItemPerPage(+event.target.value);
              setCurrentPage(1);
            }}
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
        total={total}
        itemPerPage={itemPerPage}
        currentPage={currentPage}
        onPageChange={pageChenge}
      />
      <ul>
        {visibleList.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
