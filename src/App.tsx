import React from 'react';
import './App.css';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const total = 42;
const perPageSelector = [3, 5, 10, 20];
const items = getNumbers(1, total)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const arrItems = Array.from({ length: total }, (_, i) => i + 1);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('perPage') || '5', 10);
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
    const content = event.currentTarget.textContent || '';
    const currentTargetPage = parseInt(content || '0', 10);

    if (!Number.isNaN(currentTargetPage) && currentPage !== currentTargetPage) {
      setSearchParams({ page: content, perPage: perPage.toString() });
    }

    if (content === '«' && currentPage > 1) {
      setSearchParams({
        page: (currentPage - 1).toString(),
        perPage: perPage.toString(),
      });
    }

    if (content === '»' && currentPage < totalPagesNum) {
      setSearchParams({
        page: (currentPage + 1).toString(),
        perPage: perPage.toString(),
      });
    }
  };

  const handleChangePer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSearchParams({ page: '1', perPage: event.target.value });
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
            {perPageSelector.map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
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
