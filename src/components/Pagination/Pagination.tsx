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

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageAmount.length;

  const onNextPage = () => {
    if (!isLastPage) {
      onPageChange('next');
    }
  };

  const onPrevPage = () => {
    if (!isFirstPage) {
      onPageChange('prev');
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        {
          disabled: isFirstPage,
        },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={onPrevPage}
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
          disabled: isLastPage,
        },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={onNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
