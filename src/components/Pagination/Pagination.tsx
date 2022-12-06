import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pagination: number[] = getNumbers(1, numberOfPages);

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pagination.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item', { active: page === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${currentPage}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item', { disabled: currentPage === pagination.length },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === pagination.length}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
