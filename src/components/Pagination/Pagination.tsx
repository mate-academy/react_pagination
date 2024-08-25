import React from 'react';
import { Link } from 'react-router-dom';
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
  const nextPage = currentPage >= paginationItemsCount;
  const previousPage = currentPage === 1;

  const handleNextLinkClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();

    if (currentPage !== paginationItemsCount) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousLinkClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();

    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(['page-item', previousPage ? 'disabled' : ''])}
        onClick={e => handlePreviousLinkClick(e)}
      >
        <Link
          data-cy="prevLink"
          className="page-link"
          to="prev"
          aria-disabled={previousPage}
        >
          «
        </Link>
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
            <Link data-cy="pageLink" className="page-link" to={String(item)}>
              {item}
            </Link>
          </li>
        );
      })}

      <li
        className={classNames(['page-item', nextPage ? 'disabled' : ''])}
        onClick={e => handleNextLinkClick(e)}
      >
        <Link
          data-cy="nextLink"
          className="page-link"
          to="next"
          aria-disabled={nextPage}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
