import {
  FC, useState, useEffect, ChangeEvent,
} from 'react';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { PageItems } from './components/PageItems';
import './App.scss';
import { PerPageSelector } from './components/PerPageSelector';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const getNewPages = (itemsPerPage: number) => {
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const newPageItems = Array
    .from({ length: pageCount })
    .reduce((acc: string[][], _, idx) => {
      const newPage = items.slice(itemsPerPage * idx, itemsPerPage * (idx + 1));

      acc.push(newPage);

      return acc;
    }, []);

  return newPageItems;
};

export const App: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [firstItem, setFirstItem] = useState<number>(1);
  const [lastItem, setLastItem] = useState<number>(5);
  const [pageItems, setPageItems] = useState<string[][]>(
    getNewPages(itemsPerPage),
  );

  const currentPageItems = pageItems[currentPage - 1];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangeItemsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
  };

  useEffect(() => {
    const newPages = getNewPages(itemsPerPage);

    setPageItems(newPages);
    setCurrentPage(1);
  }, [itemsPerPage]);

  useEffect(() => {
    const currLastItem = currentPage * itemsPerPage;

    const newLastItem = currLastItem > items.length
      ? (currLastItem - (currLastItem % items.length))
      : currLastItem;

    const newFirstItem = newLastItem - (pageItems[currentPage - 1].length) + 1;

    setFirstItem(newFirstItem);
    setLastItem(newLastItem);
  }, [currentPage, itemsPerPage, pageItems]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${items.length})`}
      </p>

      <PerPageSelector
        itemsPerPage={itemsPerPage}
        handleChangeItemsPerPage={handleChangeItemsPerPage}
      />

      <Pagination
        total={items.length}
        currentPage={currentPage}
        perPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      <PageItems currentPageItems={currentPageItems} />
    </div>
  );
};
