import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number, // total number of items to paginate
  perPage: number, // number of items per page
  currentPage: number, /* optional with 1 by default */
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1
            ? 'true'
            : 'false'}
          onClick={() => (
            (currentPage > 1)
            && onPageChange(currentPage - 1))}
        >
          «
        </a>
      </li>

      {pages.map(item => (
        <li
          className={classNames('page-item',
            { active: currentPage === item })}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}

      <li className={classNames('page-item',
        { disabled: currentPage === totalPages })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages
            ? 'true'
            : 'false'}
          onClick={() => (
            (currentPage < totalPages)
            && onPageChange(currentPage + 1))}
        >
          »
        </a>
      </li>
    </ul>
  );
};
