import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  // const [totalItems] = useState<string[]>(items);
  // const [itemsPerPage, setItemsPerPage] = useState(5);
  // const [currentPage, setCurrentPage] = useState(0);
  const [isSearchParams, setSearchParams] = useSearchParams();

  const page = Number(isSearchParams.get('page'));
  const perPage = Number(isSearchParams.get('perPage') || 5);

  const getSearchWith = (
    searchParams: URLSearchParams,
    params: { [key: string]: string[] | string | null },
  ) => {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);

        value.forEach(el => {
          searchParams.append(key, el);
        });
      } else {
        searchParams.set(key, value);
      }
    });

    return searchParams.toString();
  };

  // const firstItem = itemsPerPage * currentPage;
  const firstItem = perPage * page;
  // const lastItem = Math.min(
  //   (currentPage + 1) * itemsPerPage,
  //   totalItems.length,
  // );
  const lastItem = Math.min(
    (page + 1) * perPage,
    items.length,
  );

  const currentItems = items.slice(firstItem, lastItem);

  const onPageChange = ((currPage: number) => {
    // setCurrentPage(currPage);
    setSearchParams(
      getSearchWith(isSearchParams, { page: currPage.toString() || null }),
    );
  });

  const changeItemPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // updateSearchParams({ perPage: e.target.value || null });
    // setItemsPerPage(+e.target.value);
    // setCurrentPage(0);
    setSearchParams(
      getSearchWith(isSearchParams, {
        perPage: e.target.value || null,
        page: '0',
      }),
    );
    // updateSearchParams({ page: 0 || null });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page + 1} (items ${(firstItem) + 1} - ${lastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={changeItemPerPage}
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
        currentItems={currentItems}
        totalItems={items}
        currentPage={page}
        onPageChange={onPageChange}
        itemPerPage={perPage}
      />
    </div>
  );
};

export default App;
