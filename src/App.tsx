import React, { useState } from 'react';

import './App.css';
import { ItemsPerPage } from './types/ItemsPerPage';
import { getNumbers, getItemsOnCurrentPage } from './utils';

import { Pagination } from './components/Pagination';
import { Items } from './components/Items';
import { PerPageSelector } from './components/PerPageSelector';
import { usePageSearchParams } from './hooks/usePageSearchParams';
import { Info } from './components/Info';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const optionsItemsPerPage: ItemsPerPage[] = [3, 5, 10, 20];

const DEFAULT_PAGE = 1;
const DEFAULT_ITEMS_PER_PAGE: ItemsPerPage = 5;

export const App: React.FC = () => {
  const { searchParamPerPage, setSearchParams, searchParamPage } =
    usePageSearchParams(optionsItemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(
    searchParamPage || DEFAULT_PAGE,
  );
  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>(
    searchParamPerPage || DEFAULT_ITEMS_PER_PAGE,
  );

  const visibleItems = getItemsOnCurrentPage(items, currentPage, itemsPerPage);

  const onItemsPerPageChange = (itemsNumber: ItemsPerPage) => {
    setItemsPerPage(itemsNumber);
    setCurrentPage(DEFAULT_PAGE);
    setSearchParams(prev => {
      prev.set('perPage', itemsNumber.toString());
      prev.set('page', DEFAULT_PAGE.toString());

      return prev;
    });
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams(prev => {
      prev.set('page', page.toString());

      return prev;
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <Info
        currentPage={currentPage}
        items={visibleItems}
        total={items.length}
      />
      <PerPageSelector
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        optionsItemsPerPage={optionsItemsPerPage}
      />
      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <Items items={visibleItems} />
    </div>
  );
};

export default App;
