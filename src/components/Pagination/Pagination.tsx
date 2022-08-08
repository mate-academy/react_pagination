import React, { useMemo } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageItems = useMemo(() => {
    return getNumbers(1, Math.ceil(total / perPage));
  }, [total, perPage]);

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === 1 },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {pageItems.map(item => (
        <li
          key={item}
          className={classNames(
            'page-item',
            { active: currentPage === item },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => {
              onPageChange(item);
            }}
          >
            {item}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === pageItems.length },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageItems.length}
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
