import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));
  const handlePageChange = (buttonType: string, condition: boolean) => {
    const action = buttonType === 'prev'
      ? currentPage - 1
      : currentPage + 1;

    if (!condition) {
      onPageChange(action);
    }
  };

  const isFirst = currentPage === 1;
  const isLast = currentPage === pages.length;

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: isFirst },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirst}
          onClick={() => handlePageChange('prev', isFirst)}
        >
          «
        </a>
      </li>
      {pages.map(page => {
        const isCurrent = page === currentPage;

        return (
          <li
            key={page}
            className={classNames(
              'page-item',
              { active: isCurrent },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li className={classNames(
        'page-item',
        { disabled: isLast },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLast}
          onClick={() => handlePageChange('next', isLast)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
