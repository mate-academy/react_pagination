import React from 'react';
import './App.css';
import { useSearchParams } from 'react-router-dom';
import { Items } from './components/Items';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const currentPage = searchParams.get('page') || '1';
  const currentPerPage = searchParams.get('perPage') || '5';

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    searchParams.set('page', `${1}`);
    searchParams.set('perPage', `${value}`);
    setSearchParams(searchParams);
  };

  const handlePageChange = (current: string) => {
    if (current === currentPage) {
      return;
    }

    searchParams.set('page', `${current}`);
    setSearchParams(searchParams);
  };

  const handleNextPage = () => {
    searchParams.set('page', `${String(Number(currentPage) + 1)}`);
    setSearchParams(searchParams);
  };

  const handlePrevPage = () => {
    searchParams.set('page', `${String(Number(currentPage) - 1)}`);
    setSearchParams(searchParams);
  };

  const indexOfLastItem = +currentPage * +currentPerPage;
  const indexOfFirstitem = indexOfLastItem - +currentPerPage;
  const visibleItems = items.slice(indexOfFirstitem, indexOfLastItem);

  const getItem = (index: number) => visibleItems[index].split(' ')[1];

  const itemsFrom = getItem(0);
  const itemsTo = getItem(visibleItems.length - 1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`
          Page ${currentPage} 
          (items ${itemsFrom} - ${itemsTo} of ${items.length})
        `}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={currentPerPage}
            onChange={handleSelect}
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
        total={42}
        perPage={currentPerPage}
        page={currentPage}
        onPageChange={handlePageChange}
        onNextChange={handleNextPage}
        onPrevChange={handlePrevPage}
      />
      <Items items={visibleItems} />
    </div>
  );
};

export default App;
