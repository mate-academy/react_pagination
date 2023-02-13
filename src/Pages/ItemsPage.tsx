import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Items } from '../components/Items';
import { getNumbers } from '../utils';
import { Pagination } from '../components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const ItemsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const DEFAULT_PAGE = 1;
  const DEFAULT_ITEMS_PER_PAGE = 5;

  const currentPage = +(searchParams.get('page') || DEFAULT_PAGE);
  const itemsPerPage = +(searchParams.get('perPage') || DEFAULT_ITEMS_PER_PAGE);

  function updateSearch(params: { [key: string]: string | null }) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });

    setSearchParams(searchParams);
  }

  const setCurrentPage = (newCurrentPage: number) => {
    updateSearch({ page: `${newCurrentPage}` });
  };

  const setItemsPerPage = (newItemsPerPage: number) => {
    updateSearch({
      page: '1',
      perPage: `${newItemsPerPage}`,
    });
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItem = items.slice(firstItemIndex, lastItemIndex);
  const total = items.length;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemIndex + 1} - ${lastItemIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={({ target }) => {
              setItemsPerPage(+target.value);
            }}
            defaultValue={itemsPerPage}
          >
            {[3, 5, 10, 20].map(num => (
              <option value={num} key={num}>{num}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Items items={currentItem} />
      <Pagination
        totalItems={total}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        paginate={paginate}
      />
    </div>
  );
};
