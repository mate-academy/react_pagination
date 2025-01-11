import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Fragment } from 'react/jsx-runtime';

type Props = {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  useEffect(() => {
    onPageChange(1);
  }, [perPage, onPageChange]);

  const pageItem = Math.ceil(total.length / perPage);

  function getPageNumber(page: number): number[] {
    const pages: number[] = [];

    for (let i = 1; i <= page; i++) {
      pages.push(i);
    }

    return pages;
  }

  const pagesPerPage = getPageNumber(pageItem);

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'prev' && currentPage > 1) {
      onPageChange(currentPage - 1);
    } else if (direction === 'next' && currentPage < pagesPerPage.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Fragment>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => handlePageChange('prev')}
          >
            «
          </a>
        </li>
        {pagesPerPage.map(page => (
          <li
            className={classNames('page-item', {
              active: currentPage === page,
            })}
            key={page}
            onClick={() => onPageChange(page)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage === pagesPerPage.length,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesPerPage.length}
            onClick={() => handlePageChange('next')}
          >
            »
          </a>
        </li>
      </ul>
    </Fragment>
  );
};
