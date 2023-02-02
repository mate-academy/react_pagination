import { FC } from 'react';
import classNames from 'classnames';

import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
  currentPage?: number;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  onPageChange,
  currentPage = 1,
}) => {
  const pagesNum = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesNum);

  const handlePageChange = (newPage: number): void => {
    if (
      currentPage === newPage
      || newPage < 1
      || newPage > pagesNum
    ) {
      return;
    }

    onPageChange(newPage);
  };

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
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pages.map(n => (
        <li
          key={n}
          className={classNames(
            'page-item',
            {
              active: currentPage === n,
            },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item',
        {
          disabled: currentPage === pagesNum,
        },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesNum}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};

Pagination.defaultProps = {
  currentPage: 1,
};
