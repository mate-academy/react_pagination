import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {

  const paginsLength = Math.ceil(total / perPage);
  const pagins: number[] = getNumbers(1, paginsLength);

  type Pager = number | 'prev' | 'next';

  const handlePage = (pager: Pager) => {
    switch (pager) {
      case 'prev':
        if ((currentPage - 1) > 0) {
          onPageChange(currentPage - 1);
        }
        break;

      case 'next':
        if ((currentPage + 1) <= paginsLength) {
          onPageChange(currentPage + 1);
        }
        break;

      default:
        if (pager !== currentPage) {
          onPageChange(pager);
        }
    }
  }

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          {'disabled': currentPage === 1}
        )}
        onClick={() => handlePage('prev')}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>

      {pagins.map(page => {
        return (
          <li
            key={`page-${page}`}
            className={classNames(
              'page-item',
              {'active': page === currentPage}
            )}
            onClick={() => handlePage(page)}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
            >
              {page}
            </a>
          </li>
        )
      })}

      <li
        className={classNames(
          'page-item',
          {'disabled': currentPage === paginsLength}
        )}
        onClick={() => handlePage('next')}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === paginsLength}
        >
          »
        </a>
      </li>
    </ul>
  );
};
