import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const total = 42;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const perPageSelector = [3, 5, 10, 20];
  const arrItems = Array.from({ length: total }, (_, i) => i + 1);
  const items = getNumbers(1, total)
    .map(n => `Item ${n}`);

  const getPageItems = (
    array: string[] | number[],
    perNum: number,
    currentNum: number,
  ): string[] | number[] => {
    const startIndex = (currentNum - 1) * perNum;
    const endIndex = Math.min(startIndex + perNum, array.length);

    const pageItems = array.slice(startIndex, endIndex);

    return pageItems;
  };

  const selectedItemsFromTo = getPageItems(arrItems, perPage, currentPage);
  const itemsOnPage = getPageItems(items, perPage, currentPage);
  const totalPagesNum: number = Math.ceil(total / perPage);
  const firstItem = selectedItemsFromTo[0];
  const lastItem = selectedItemsFromTo[selectedItemsFromTo.length - 1];
  const onPageChange = (event:React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const content = event.currentTarget.textContent;
    const currentTargetPage = parseInt(content || '0', 10);

    if (currentPage !== currentTargetPage) {
      setCurrentPage(currentTargetPage);
    }

    if (content === '«' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

    if (content === '»' && currentPage < totalPagesNum) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleChangePer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={perPage}
            className="form-control"
            onChange={handleChangePer}
          >
            {perPageSelector.map((num) => {
              // eslint-disable-next-line max-len
              return <option key={num} value={num}>{num}</option>;
            })}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        itemsOnPage={itemsOnPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
