import React, { useState } from 'react';

import './Pagination.css';

const perPageOptions = [3, 5, 10, 20];

type Props = {
  page: number;
  setPage: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({ page, setPage }) => {
  const [total, setTotal] = useState(42);
  const [perPage, setperPage] = useState(5);
  const firstPage = page - page + 1;
  const lastPage = Math.ceil(total / perPage);
  const nextPage = page + 1;
  const prevPage = page - 1;
  const addDotsAfter = page < lastPage - 2;
  const addDotsBefore = page > 3;
  const addNextPage = page < lastPage - 1;
  const addPrevPage = page > 2;
  const isFirstPage = page > 1;
  const isVisivleLastPage = page !== lastPage;

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPage(Number(event.currentTarget.textContent));
  };

  const onNext = () => {
    setPage(nextPage);
  };

  const onPrevious = () => {
    setPage(prevPage);
  };

  const onTotalItemsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(Number(event.target.value));
    setPage(1);
  };

  const onPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setperPage(Number(event.target.value));
    setPage(1);
  };

  const itemsFrom = () => {
    return page * perPage - (perPage - 1);
  };

  const itemsTo = () => {
    if (page * perPage >= total) {
      return total;
    }

    return page * perPage;
  };

  return (
    <>
      <div className="pagination">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={onPrevious}
          disabled={page <= 1}
        >
          <span>«</span>
        </button>

        {isFirstPage && (
          <button
            className="btn btn-outline-info"
            type="button"
            onClick={onPageChange}
          >
            {firstPage}
          </button>
        )}

        {addPrevPage && (
          <>
            {addDotsBefore && (
              <span className="dots">...</span>
            )}
            <button
              className="btn btn-outline-info"
              type="button"
              onClick={onPageChange}
            >
              {prevPage}
            </button>
          </>
        )}

        <button type="button" className="active btn btn-info">
          {page}
        </button>

        {addNextPage && (
          <>
            <button
              className="btn btn-outline-info"
              type="button"
              onClick={onPageChange}
            >
              {nextPage}
            </button>
            {addDotsAfter && (
              <span className="dots">...</span>
            )}
          </>
        )}

        {isVisivleLastPage && (
          <button
            className="btn btn-outline-info"
            type="button"
            onClick={onPageChange}
          >
            {lastPage}
          </button>
        )}

        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={onNext}
          disabled={page >= lastPage}
        >
          <span>»</span>
        </button>
      </div>

      <ul className="list-group">
        <li className="list-group-item">
          <label htmlFor="totalItems">
            <span>Set total items: </span>
            <input
              type="number"
              name="totalItems"
              value={total}
              min="1"
              max="1000"
              onChange={onTotalItemsChange}
            />
          </label>
        </li>

        <li className="list-group-item">
          <label htmlFor="perPageOptions">
            <span>Select the number of items per page: </span>
            <select
              name="perPageOptions"
              id="perPageOptions"
              onChange={onPerPageChange}
              value={perPage}
            >
              {perPageOptions.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </li>

        <li className="list-group-item">
          <span>{`Total count of pages: ${lastPage}`}</span>
        </li>

        <li className="list-group-item">
          <span>{`Available items on page: ${itemsFrom()} - ${itemsTo()} of ${total} items`}</span>
        </li>

        <li className="list-group-item">
          <span>{`Total items: ${total}`}</span>
        </li>
      </ul>
    </>
  );
};
