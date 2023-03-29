import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChanger: (num: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChanger,
}) => {
  const paginsLength = Math.ceil(total / perPage);
  const pagins: number[] = getNumbers(1, paginsLength);

  const handlePageChange = (page: number) => {
    if (page === currentPage || page > paginsLength || page < 1) {
      return;
    }

    onPageChanger(page);
  };

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
          onClick={() => handlePageChange(currentPage - 1)}
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
              { active: page === currentPage },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChanger(page)}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === paginsLength },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === paginsLength}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
