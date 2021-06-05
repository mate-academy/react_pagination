/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import uuid from 'react-uuid';
import queryString from 'query-string';
import {
  MIN_TOTAL, MAX_TOTAL, FIRST_PAGE,
  WINDOW_SIZE, PER_PAGE_OPTIONS,
} from '../../helpers/constants';

import './Pagination.css';

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

  const isFirstPage = page === FIRST_PAGE;
  const isLastPage = page === pageCount;

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

  const { pathname, search } = useLocation();
  const searchParams = queryString.parse(search);

  return (
    <nav className="Page navigation">
      <ul className="pagination pagination-lg justify-content-center">
        <li
          className={cn('page-item', {
            disabled: isFirstPage,
          })}
        >
          <Link
            to={{
              pathname,
              search: queryString.stringify({
                ...searchParams,
                page: page - 1,
              }),
            }}
            className="page-link"
            href="#"
            aria-label="Previous"
            aria-disabled={isFirstPage ? 'true' : 'false'}
            onClick={prevPage}
            tabIndex={isFirstPage ? -1 : 0}
          >
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>

        {window.map(pageNumber => (
          <li
            key={uuid()}
            className={cn('page-item', {
              active: page === pageNumber,
              disabled: pageNumber === '...',
            })}
          >
            <Link
              to={{
                pathname,
                search: queryString.stringify({
                  ...searchParams,
                  page: pageNumber,
                }),
              }}
              className="page-link"
              href="#"
              onClick={() => onPageChange(pageNumber)}
              data-testid={pageNumber}
            >
              {pageNumber}
            </Link>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: isLastPage,
          })}
        >
          <Link
            to={{
              pathname,
              search: queryString.stringify({
                ...searchParams,
                page: page + 1,
              }),
            }}
            className="page-link"
            href="#"
            aria-label="Next"
            aria-disabled={isLastPage ? 'true' : 'false'}
            onClick={nextPage}
            tabIndex={isLastPage ? -1 : 0}
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
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
              {PER_PAGE_OPTIONS.map(option => (
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
