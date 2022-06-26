import React, { useState } from 'react';

const perPageRange = [3, 5, 10, 20];

export const Pagination: React.FC = () => {
  const [total, setTotal] = useState(42);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const lastPage = Math.ceil(total / perPage);
  const firstPage = page - page + 1;
  const nextPage = page + 1;
  const previousPage = page - 1;
  const setDotsBefore = page > 3;
  const setDotsAfter = page < lastPage - 2;
  const setPrevPage = page > 2;
  const setNextPage = page < lastPage - 1;
  const isFirtsPage = page > 1;
  const isLastPage = page < lastPage;
  const isVisibleLastPage = page !== lastPage;

  const onPrevious = () => {
    setPage(previousPage);
  };

  const onNext = () => {
    setPage(nextPage);
  };

  const onTotalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(+event.target.value);
    setPage(1);
  };

  const onPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setPage(1);
  };

  const fromItem = () => page * perPage - (perPage - 1);

  const toItem = () => {
    if (page * perPage >= total) {
      return total;
    }

    return page * perPage;
  };

  return (
    <>
      <div className="button__family">
        <button
          type="button"
          onClick={onPrevious}
          disabled={page <= 1}
          className="button"
        >
          <span>Previous Page</span>
        </button>

        {isFirtsPage && (
          <button
            type="button"
            onClick={e => {
              if (e.currentTarget.textContent) {
                setPage(+e.currentTarget.textContent);
              }
            }}
            className="button"
          >
            {firstPage}
          </button>
        )}

        {setPrevPage && (
          <>
            {setDotsBefore && (
              <span className="dots">...</span>
            )}
            <button
              type="button"
              onClick={e => {
                if (e.currentTarget.textContent) {
                  setPage(+e.currentTarget.textContent);
                }
              }}
              className="button"
            >
              {previousPage}
            </button>
          </>
        )}

        <button type="button" className="active button">
          {page}
        </button>

        {setNextPage && (
          <>
            <button
              type="button"
              onClick={e => {
                if (e.currentTarget.textContent) {
                  setPage(+e.currentTarget.textContent);
                }
              }}
              className="button"
            >
              {nextPage}
            </button>
            {setDotsAfter && (
              <span className="dots">...</span>
            )}
          </>
        )}

        {isVisibleLastPage && (
          <button
            type="button"
            onClick={e => {
              if (e.currentTarget.textContent) {
                setPage(+e.currentTarget.textContent);
              }
            }}
            className="button"
          >
            {lastPage}
          </button>
        )}

        <button
          type="button"
          onClick={onNext}
          disabled={page >= lastPage}
          className="button"
        >
          <span>nextPage</span>
        </button>
      </div>

      <hr />

      <label htmlFor="total" className="total">
        <span>Set amount items: </span>
        <input
          type="number"
          name="total"
          id="total"
          value={total}
          onChange={onTotalChange}
        />
      </label>

      <hr />

      <label htmlFor="pagesRange">
        Choose available items per page:
        <select
          name="pagesRange"
          id="pagesRange"
          onChange={onPerPageChange}
          defaultValue={perPage}
        >
          {perPageRange.map(item => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </label>

      <hr />
      {`count of pages: ${lastPage}`}
      <hr />
      <span>
        {`Available on page: ${fromItem()} - ${toItem()} of ${total} items.`}
      </span>
      <hr />
      {`total: ${total}`}
      <br />
      {`perPage: ${perPage}`}
      <br />
      {isFirtsPage && (
        <div>{`prevPage: ${previousPage}`}</div>
      )}
      {`page: ${page}`}
      <br />
      {isLastPage && (
        <div>{`nextPage: ${nextPage}`}</div>
      )}
      {`queryParams: ?page=${page}&perPage=${perPage}`}
    </>
  );
};
