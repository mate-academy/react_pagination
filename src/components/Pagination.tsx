import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Pagination.css';

type Props = {
  total: number;
  perPage: number;
  page: number;
  onPageChange: (pageNumber: number) => void;
  toNextPage: () => void;
  toPrevPage: () => void;
  selectPerPage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  onPageChange,
  toNextPage,
  toPrevPage,
  selectPerPage,
}) => {
  const pages = [];
  const itemsFrom = (page - 1) * perPage + 1;
  const itemsTo = page * perPage;

  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    pages.push(i);
  }

  return (
    <>
      <div className="select">
        <div className="select__text text">Items per page</div>
        <select
          name="item"
          value={perPage}
          onChange={(event) => {
            selectPerPage(+event.target.value);
          }}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className="with-info text">
        Items
        {' '}
        {itemsFrom}
        {' '}
        -
        {' '}
        {itemsTo > total ? total : itemsTo}
        {' '}
        of
        {' '}
        {total}
      </div>

      <ul className="pagination">
        <li className="prev">
          <button
            type="button"
            className="button prev"
            disabled={page === 1}
            onClick={() => {
              toPrevPage();
            }}
          >
            Previos
          </button>
        </li>

        {pages.map((pageNumber) => (
          <li
            key={pageNumber}
            className={
              pageNumber === page
              || pageNumber === 1
              || pageNumber === page - 1
              || pageNumber === page + 1
              || pageNumber === pages.length
                ? 'pagination__item--active'
                : 'pagination__item'
            }
          >
            {pageNumber === page - 1 && pageNumber !== 1 && perPage !== 20 && (
              <span className="text">...</span>
            )}
            <Link to={`?page=${pageNumber}perPage=${perPage}`}>
              <button
                type="button"
                className={classNames('button', {
                  button__active: pageNumber === page,
                })}
                onClick={() => {
                  onPageChange(pageNumber);
                }}
              >
                {pageNumber}
              </button>
            </Link>

            {pageNumber === page + 1 && pageNumber !== 9 && perPage !== 20 && (
              <span className="text">...</span>
            )}
          </li>
        ))}

        <li className="next">
          <button
            type="button"
            className="button next"
            disabled={page === pages.length}
            onClick={() => {
              toNextPage();
            }}
          >
            Next
          </button>
        </li>
      </ul>
    </>
  );
};
