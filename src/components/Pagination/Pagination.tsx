import React from 'react';
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
  const paginationItemsCount = Math.ceil(total / perPage);
  const next = currentPage >= paginationItemsCount;
  const previous = currentPage === 1;

  const handleNextLinkClick = () => {
    if (currentPage !== paginationItemsCount) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousLinkClick = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(['page-item', previous ? 'disabled' : ''])}
        onClick={handlePreviousLinkClick}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={previous}
        >
          «
        </a>
      </li>

      {getNumbers(1, paginationItemsCount).map((item, index) => {
        const page = index + 1;

        return (
          <li
            className={classNames([
              'page-item',
              page === currentPage ? 'active' : '',
            ])}
            onClick={() => onPageChange(page)}
            key={index}
          >
            <a data-cy="pageLink" className="page-link" href={`#${item}`}>
              {item}
            </a>
          </li>
        );
      })}

      <li
        className={classNames(['page-item', next ? 'disabled' : ''])}
        onClick={handleNextLinkClick}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={next}
        >
          »
        </a>
      </li>
    </ul>
  );
};
