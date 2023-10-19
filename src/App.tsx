import React, { useState, useEffect } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const items: { title: string, id: number }[] = getNumbers(1, 42)
  .map(n => {
    return {
      title: `Item ${n}`,
      id: n,
    };
  });

interface PagesOnPage<O> {
  totalPages: number;
  currentPage: O[];
}

const pagination = <T extends unknown>(
  elements: T[],
  itemsOnPage: number,
  selectedPage: number,
): PagesOnPage<T> => {
  const totalPages = Math.ceil(elements.length / itemsOnPage);
  const startIndex = 0 + (itemsOnPage * (selectedPage - 1));

  const currentPage = [...elements].splice(startIndex, itemsOnPage);

  const result: PagesOnPage<T> = {
    totalPages,
    currentPage,
  };

  return result;
};

export const App: React.FC = () => {
  const [itemsOnPage, setItemsOnPage] = useState<number>(5);
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const { currentPage } = pagination(
    items, itemsOnPage, selectedPage,
  );

  const firstElement = currentPage[0]?.id || 0;
  const lastElement = currentPage[currentPage.length - 1]?.id || 0;

  useEffect(() => {
    setSelectedPage(1);
  }, [itemsOnPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${firstElement} - ${lastElement} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsOnPage}
            onChange={e => setItemsOnPage(Number(e.target.value))}
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
        currentPage={selectedPage}
        perPage={itemsOnPage}
        onPageChange={(page: number): void => setSelectedPage(page)}
      />

      <ul>
        {currentPage.map(({ title, id }) => (
          <li data-cy="item" key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
