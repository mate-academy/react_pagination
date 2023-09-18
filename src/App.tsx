import React, { useState } from 'react';

import './App.css';
import { getItems } from './services/utils';
import { Pagination } from './components/Pagination';
import { ItemList } from './components/ItemList';
import { PageSizeSelectList } from './components/PageSizeSelectList';
import { defaultPaginationValue } from './utils';

const PAGE_SIZE_OPTIONS = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [paginationOption, setPaginationOption] = useState({
    total: defaultPaginationValue.total,
    perPage: defaultPaginationValue.perPage,
    currentPage: defaultPaginationValue.currentPage,
  });

  const handleCurrentPage = (value: number) => setPaginationOption(
    (prevState) => {
      return {
        ...prevState,
        currentPage: value,
      };
    },
  );

  const fromItem = (paginationOption?.currentPage - 1)
    * paginationOption.perPage + 1;

  const maxCountItem = paginationOption?.currentPage * paginationOption.perPage;

  const toItem = Math.min(maxCountItem, defaultPaginationValue.total);

  const items = getItems(fromItem, toItem);

  const handleSetPaginationOption = (value: string) => {
    setPaginationOption((prevState) => {
      return {
        ...prevState,
        perPage: +value,
        currentPage: defaultPaginationValue.currentPage,
      };
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${paginationOption.currentPage} (items ${fromItem} - ${toItem} of ${paginationOption.total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <PageSizeSelectList
            selectOptions={PAGE_SIZE_OPTIONS}
            paginationOption={paginationOption}
            onSetPaginationOption={handleSetPaginationOption}
          />
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        paginationOption={paginationOption}
        onPageChange={handleCurrentPage}
      />

      <ItemList items={items} />
    </div>
  );
};

export default App;
