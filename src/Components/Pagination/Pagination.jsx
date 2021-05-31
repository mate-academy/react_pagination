import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PaginationButton } from '../PaginationButton';

export const Pagination = ({ total, itemsOnPage, page, onChangePage }) => {
  const maxPages = Math.ceil(total / itemsOnPage);
  const getValue = pageNum => ((
    (pageNum === page - 2 && pageNum !== 1)
        || (pageNum === page + 2 && pageNum !== maxPages)
  )
    ? '...'
    : pageNum.toString());

  return (
    <nav className="p-2 m-auto">
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: page === 1 })}
        >
          <PaginationButton
            simbol="&laquo;"
            page={`${page - 1}`}
            onPageChange={onChangePage}
          />
        </li>

        {Array
          .from({ length: maxPages }, (_, i) => i + 1)
          .filter(pageNum => pageNum === 1
                        || pageNum === maxPages
                        || (pageNum >= page - 2 && pageNum <= page + 2))
          .map(pageNum => (
            <li
              className={classNames('page-item', {
                active: pageNum === page,
                disabled: getValue(pageNum) === '...',
              })}
              key={pageNum}
            >
              <PaginationButton
                page={getValue(pageNum)}
                onPageChange={onChangePage}
              />
            </li>
          ))
                }
        <li
          className={classNames('page-item', {
            disabled: page === maxPages,
          })}
        >
          <PaginationButton
            simbol="&raquo;"
            page={`${page + 1}`}
            onPageChange={onChangePage}
          />
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  itemsOnPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
