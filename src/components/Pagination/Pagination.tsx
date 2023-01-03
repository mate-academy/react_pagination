import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: Page,
  currentPage: Page,
  onPageChange: (page: Page) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));

  const handleClickPage = (page: Page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleArrow = (direction: string) => {
    if ((
      currentPage === 1 && direction === 'prev')
      || (currentPage === pages.length && direction === 'next')) {
      return;
    }

    onPageChange(direction === 'next' ? currentPage + 1 : currentPage - 1);
  };

  return (
    <ul className="pagination">
      <li className={
        classNames('page-item', { disabled: currentPage === 1 })
      }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => handleArrow('prev')}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={
            classNames('page-item', { active: page === currentPage })
          }
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handleClickPage(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={
        classNames('page-item', { disabled: currentPage === pages.length })
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length ? 'true' : 'false'}
          onClick={() => handleArrow('next')}
        >
          »
        </a>
      </li>
    </ul>
  );
};
