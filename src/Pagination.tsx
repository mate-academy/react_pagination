import React from 'react';
import classNames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  page: number;
  onPageChange: (x: number) => void;
  siblingCount: number;
  withInfo: boolean;
  onPerPageChange: (y: number) => void;
};

const Pagination: React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    page,
    onPageChange,
    siblingCount,
    withInfo,
    onPerPageChange,
  } = props;

  const paginationRange: number[] = usePagination({
    total,
    perPage,
    page,
    siblingCount,
  });

  if (page === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(page + 1);
  };

  const onPrevious = () => {
    onPageChange(page - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="pagination">
      {withInfo && (
        <p className="pagination__text">
          {page === lastPage
            ? `${(page - 1) * perPage + 1}-${total} of ${total}`
            : `${(page - 1) * perPage + 1}-${perPage * page} of ${total}`}
        </p>
      )}
      <ul className="pagination-container">
        <button
          type="button"
          className={classNames('pagination-item', {
            disabled: page === 1,
          })}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </button>

        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <button
                className="pagination-item dots"
                type="button"
                key={pageNumber}
              >
                &#8230;
              </button>
            );
          }

          return (
            <button
              className={classNames('pagination-item', {
                selected: pageNumber === page,
              })}
              onClick={() => onPageChange(pageNumber)}
              type="button"
              key={pageNumber}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className={classNames('pagination-item', {
            disabled: page === lastPage,
          })}
          onClick={onNext}
          type="button"
        >
          <div className="arrow right" />
        </button>
      </ul>

      <div className="pagination__selectWrapper">
        <p className="pagination__selectText">Count element per page:</p>
        <select
          value={perPage}
          onChange={(event) => {
            const { value } = event.target;

            onPerPageChange(+value);
          }}
          className="pagination__select"
        >
          <option>3</option>
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
