import classNames from 'classnames';
import React, { useMemo } from 'react';

import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number | string) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageAmount = useMemo(() => {
    const pageCount = Math.ceil(total / perPage);

    return getNumbers(1, pageCount);
  }, [total, perPage]);

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        {
          disabled: currentPage === 1,
        },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange('prev');
            }
          }}
        >
          «
        </a>
      </li>
      {pageAmount.map(numberOfPage => (
        <li
          key={numberOfPage}
          className={classNames(
            'page-item',
            {
              active: numberOfPage === currentPage,
            },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${numberOfPage}`}
            onClick={() => onPageChange(numberOfPage)}
          >
            {numberOfPage}
          </a>
        </li>
      ))}
      <li className={classNames(
        'page-item',
        {
          disabled: currentPage === pageAmount.length,
        },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageAmount.length}
          onClick={() => {
            if (currentPage < pageAmount.length) {
              onPageChange('next');
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
