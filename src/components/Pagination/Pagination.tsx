import classNames from 'classnames';
import React, { useMemo } from 'react';
import { getNumbers } from '../../utils';

type PaginationProps = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = useMemo(() => Math.ceil(total / perPage), [perPage]);

  const pages = getNumbers(1, pageCount);

  const handleChangePrev = () => (
    (currentPage !== 1)
      ? onPageChange(currentPage - 1)
      : onPageChange(currentPage)
  );

  const handleChangeNext = () => (
    (currentPage !== pageCount)
      ? onPageChange(currentPage + 1)
      : onPageChange(currentPage)
  );

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handleChangePrev}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            { active: currentPage === page },
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
      ))}

      <li className={classNames(
        'page-item',
        { disabled: currentPage === pageCount },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={handleChangeNext}
        >
          »
        </a>
      </li>

    </ul>
  );
};
