import { ChangeEventHandler, useState, FC } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ItemList } from './components/ItemList';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: FC = () => {
  const [perPage, setPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState('1');

  const handlePerPageSelect: ChangeEventHandler<HTMLSelectElement>
  = (event) => {
    setPerPage(event.target.value);
    setCurrentPage('1');
  };

  const onPageChange = (value: string) => {
    if (value === 'next') {
      setCurrentPage(prev => String(+prev + 1));

      return;
    }

    if (value === 'prev') {
      setCurrentPage(prev => String(+prev - 1));

      return;
    }

    setCurrentPage(value);
  };

  const firstVisibleIndex = (+currentPage - 1) * +perPage;
  const lastVisibleIndex = Math.min(
    (firstVisibleIndex + +perPage), items.length,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage}
        (items ${firstVisibleIndex + 1} - ${lastVisibleIndex}
        of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageSelect}
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ItemList
        items={items}
        firstIndex={firstVisibleIndex}
        lastIndex={lastVisibleIndex}
      />
    </div>
  );
};

export default App;
