import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Pagination.css';

export const Pagination = ({
  page, perPage, total, onPageChange, withInfo,
}) => {
  const [pageCount, setPageCount] = useState(() => {
    if (perPage === 0) {
      return total;
    }

    return Math.ceil(total / perPage);
  });

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
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
      <p className="Pagination__info">withInfo</p>
    </nav>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  withInfo: PropTypes.bool,
};

Pagination.defaultProps = {
  page: 1,
  perPage: 5,
  withInfo: false,
};
