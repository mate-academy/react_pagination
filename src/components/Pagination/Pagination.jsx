/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react';
import classNames from 'classnames';
import './Pagination.css';
import PropTypes from 'prop-types';

export const Pagination = ({
  total, onTotalChange, perPage,
  onPerPage, page, onPage,
}) => {
  const pageOption = [3, 5, 10, 20];
  const pageCount = useMemo(() => {
    onPage(1);

    return (Math.floor(total / perPage) + 1);
  }
  , [total, perPage]);
  const info = useMemo(() => (`${(page - 1) * perPage} - ${page === pageCount
    ? ((page - 1) * perPage) + (total % perPage)
    : page * perPage} of ${total}`), [page, perPage, total, pageCount]);

  const updatePaginationArr = useMemo(() => {
    const resultArr = Array(pageCount).fill(1)
      .map((item, index) => item + index);

    if (pageCount <= 5) {
      return (resultArr);
    }

    if (page <= 3) {
      return (resultArr.slice(0, page + 1).concat(['...', pageCount]));
    }

    if (page > 3 && page < pageCount - 2) {
      return ([1].concat('...', resultArr
        .slice(page - 2, page + 1), '...', pageCount));
    }

    return ([1].concat('...', resultArr.slice(page - 2, pageCount)));
  }, [pageCount, page]);

  return (
    <nav className="navigation">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-3">
            <label>
              Total items:
              <input
                type="number"
                id="total"
                name="total"
                value={total}
                className="form-control"
                onChange={event => onTotalChange(+event.target.value)}
              />
            </label>
          </div>

          <div className="col-3">
            <label htmlFor="perPage">Items per page:</label>
            <select
              name="perPage"
              id="perPage"
              value={perPage}
              onChange={event => onPerPage(+event.target.value)}
              className="form-select"
            >
              {pageOption.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <ul className="pagination pagination-lg justify-content-center">
        <li className={classNames('page-item',
          { disabled: page === 1 && true })}
        >
          <a
            className="page-link"
            href="#"
            tabIndex={page === 1 ? '-1' : '0'}
            aria-disabled={page === 1 ? 'true' : 'false'}
            onClick={() => onPage(page - 1)}
          >
            Previous
          </a>
        </li>
        {updatePaginationArr.map((item, index) => (
          <li
            key={index}
            className="page-item"
          >
            <a
              className={classNames('page-link',
                { active: page === item && true })}
              href="#"
              aria-label="Previous"
              onClick={item !== '...' && (() => onPage(item))}
            >
              {item}
            </a>
          </li>
        ))}
        <li className={classNames('page-item',
          { disabled: page === pageCount && true })}
        >
          <a
            className="page-link"
            tabIndex={page === pageCount ? '-1' : '0'}
            aria-disabled={page === pageCount ? 'true' : 'false'}
            href="#"
            onClick={() => onPage(page + 1)}
          >
            Next
          </a>
        </li>
      </ul>
      <p className="Pagination__info">
        {info}
      </p>
    </nav>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onTotalChange: PropTypes.func.isRequired,
  onPerPage: PropTypes.func.isRequired,
  onPage: PropTypes.func.isRequired,
};
