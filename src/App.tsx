import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const itemsFromServer = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const getVisibleItems = (
    items: string[],
    page: number,
    itemsPerPage: number,
  ): string[] => items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    itemsPerPage: 5,
  });
  const [itemsToDisplay, setItemsToDisplay] = useState(itemsFromServer);

  useEffect(() => {
    setItemsToDisplay(
      getVisibleItems(itemsFromServer, pageInfo.page, pageInfo.itemsPerPage),
    );
  }, [pageInfo]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${pageInfo.page} (items ${(pageInfo.page - 1) * pageInfo.itemsPerPage + 1} - ${pageInfo.page * pageInfo.itemsPerPage < itemsFromServer.length ? pageInfo.page * pageInfo.itemsPerPage : itemsFromServer.length} of ${itemsFromServer.length})`}
      </p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event =>
              setPageInfo({
                page: 1,
                itemsPerPage: Number(event.target.value),
              })
            }
            defaultValue="5"
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
        total={itemsFromServer.length}
        perPage={pageInfo.itemsPerPage}
        currentPage={pageInfo.page}
        onPageChange={(pageNum: number) =>
          setPageInfo({ ...pageInfo, page: pageNum })
        }
      />
      <ul>
        {itemsToDisplay.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
