import React from 'react';
import classNames from 'classnames';
import { PaginationButton } from '../PaginationButton';
import { PaginationProps } from '../../props/PaginationProps';

export const Pagination = ({ total, perPage, page, onPageChange }) => {
  const maxPages = Math.ceil(total / perPage);
  const getPageValue = pageNum => ((
    (pageNum === page - 2 && pageNum !== 1)
      || (pageNum === page + 2 && pageNum !== maxPages)
  )
    ? '...'
    : pageNum.toString());

  return (
    <nav className="p-2 m-auto">
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: page === 1,
          })}
        >
          <PaginationButton
            simbol="&laquo;"
            page={`${page - 1}`}
            onPageChange={onPageChange}
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
                disabled: getPageValue(pageNum) === '...',
              })}
              key={pageNum}
            >
              <PaginationButton
                page={getPageValue(pageNum)}
                onPageChange={onPageChange}
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
            onPageChange={onPageChange}
          />
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = PaginationProps;
