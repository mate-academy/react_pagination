import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Pagination.css';

const perPageOptions = [3, 5, 10, 15, 20];

const MIN_TOTAL = 1;
const MAX_TOTAL = 100;

export const Pagination = ({
  page, perPage, total,
  onPageChange, onPerPageChange, onTotalChange,
  withInfo,
}) => {
  const pageCount = useMemo(() => Math.ceil(total / perPage), [total, perPage]);

  const pageInfo = useMemo(() => {
    const from = (perPage * page) - perPage + 1;
    const to = (page === pageCount) ? total : (perPage * page);

    return {
      from, to,
    };
  }, [page, perPage, pageCount, total]);

  const nextPage = () => onPageChange(page + 1);
  const prevPage = () => onPageChange(page - 1);

  return (
    <nav className="Page navigation">
      <ul className="pagination justify-content-center">
        <li
          className={cn('page-item', {
            disabled: page <= 1,
          })}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={prevPage}
            tabIndex={page <= 1 ? -1 : 0}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {[...Array(pageCount).keys()].map(pageNumber => (
          <li
            key={pageNumber}
            className={cn('page-item', {
              active: page === pageNumber + 1,
            })}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => onPageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: page >= pageCount,
          })}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={nextPage}
            tabIndex={page >= pageCount ? -1 : 0}
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
