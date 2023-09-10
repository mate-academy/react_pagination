import React, { useState } from 'react';

// import { createBrowserRouter } from 'react-router-dom';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ItemList } from './components/ItemList';
import { PerPageList } from './components/PerPageList';

const defaultPaginVal = {
  total: 42,
  perPage: 5,
  currentPage: 1,
};

const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [paginationOption, setPaginationOption] = useState({
    total: defaultPaginVal.total,
    perPage: defaultPaginVal.perPage,
    currentPage: defaultPaginVal.currentPage,
  });

  const itemPerPageHandler = (value: string) => setPaginationOption({
    ...paginationOption,
    ...{ perPage: +value, currentPage: defaultPaginVal.currentPage },
  });

  const currentPageHandler = (value: number) => setPaginationOption({
    ...paginationOption, ...{ currentPage: value },
  });

  const fromItem = (paginationOption?.currentPage - 1)
    * paginationOption.perPage + 1;

  const maxCountItem = paginationOption?.currentPage * paginationOption.perPage;

  const toItem = maxCountItem
    > defaultPaginVal.total
    ? defaultPaginVal.total
    : maxCountItem;

  const items = getNumbers(fromItem, toItem)
    .map(n => `Item ${n}`);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${paginationOption.currentPage} (items ${fromItem} - ${toItem} of ${paginationOption.total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <PerPageList
            selectOptions={options}
            paginationOption={paginationOption}
            onChangePaginationOption={itemPerPageHandler}
          />
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        paginationOption={paginationOption}
        onPageChange={currentPageHandler}
      />

      <ItemList items={items} />
    </div>
  );
};

export default App;
