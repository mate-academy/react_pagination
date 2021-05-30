/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import uuid from 'react-uuid';

import './Pagination.css';

const perPageOptions = [3, 5, 10, 15, 20];

const MIN_TOTAL = 1;
const MAX_TOTAL = 100;
const FIRST_PAGE = 1;
const WINDOW_SIZE = 2;

export const Pagination = ({
  page, perPage, total,
  onPageChange, onPerPageChange, onTotalChange,
  withInfo,
}) => {
  const pageCount = useMemo(() => Math.ceil(total / perPage), [total, perPage]);

  const pageInfo = useMemo(() => ({
    from: (perPage * page) - perPage + 1,
    to: (page === pageCount) ? total : (perPage * page),
  }), [page, perPage, pageCount, total]);

  const nextPage = () => onPageChange(page + 1);
  const prevPage = () => onPageChange(page - 1);

  const isFirstPage = useMemo(() => page === FIRST_PAGE, [page]);
  const isLastPage = useMemo(() => page === pageCount, [page, pageCount]);

  const window = useMemo(() => {
    if (pageCount <= WINDOW_SIZE) {
      return [...Array(pageCount).keys()].map(key => key + 1);
    }

    let first;
    let last;

    if (isLastPage) {
      first = Math.max(page - WINDOW_SIZE, 1);
      last = page;
    } else {
      first = page - 1 > 0 ? page - 1 : page;
      last = Math.min(first + WINDOW_SIZE, pageCount);
    }

    if (last - first > 1) {
      const result = [first, first + 1, last];

      if (first !== FIRST_PAGE) {
        if (!result.includes(FIRST_PAGE + 1)) {
          result.unshift('...');
        }

        result.unshift(FIRST_PAGE);
      }

      if (last !== pageCount) {
        if (!result.includes(pageCount - 1)) {
          result.push('...');
        }

        result.push(pageCount);
      }

      return result;
    }

    return [first, last];
  }, [page, pageCount]);

  return (
    <nav className="Page navigation">
      <ul className="pagination pagination-lg justify-content-center">
        <li
          className={cn('page-item', {
            disabled: isFirstPage,
          })}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            aria-disabled={isFirstPage ? 'true' : 'false'}
            onClick={prevPage}
            tabIndex={isFirstPage ? -1 : 0}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {window.map((pageNumber, idx) => (
          <li
            key={uuid()}
            className={cn('page-item', {
              active: page === pageNumber,
            })}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => {
                if (pageNumber !== '...') {
                  onPageChange(pageNumber);
                }
              }}
              data-testid={pageNumber}
            >
              {pageNumber}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: isLastPage,
          })}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            aria-disabled={isLastPage ? 'true' : 'false'}
            onClick={nextPage}
            tabIndex={isLastPage ? -1 : 0}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>

      {withInfo && (
        <p className="Pagination__info">
          {`${pageInfo.from} - ${pageInfo.to} of ${total}`}
        </p>
      )}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-3">
            <label htmlFor="total">Total items:</label>
            <input
              type="number"
              id="total"
              name="total"
              value={total}
              className="form-control"
              min={MIN_TOTAL}
              max={MAX_TOTAL}
              onChange={e => onTotalChange(+e.target.value)}
            />
          </div>

          <div className="col-3">
            <label htmlFor="perPage">Items per page:</label>
            <select
              name="perPage"
              id="perPage"
              value={perPage}
              onChange={e => onPerPageChange(+e.target.value)}
              className="form-select"
            >
              {perPageOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  onTotalChange: PropTypes.func.isRequired,
  withInfo: PropTypes.bool,
};

Pagination.defaultProps = {
  page: 1,
  perPage: 5,
  withInfo: false,
};
