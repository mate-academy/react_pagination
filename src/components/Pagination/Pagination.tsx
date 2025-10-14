import React from 'react';
import classNames from 'classnames';
import { getPages } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const pages = getPages(totalPages);

  const handleChangePage = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isFirst) {
      handleChangePage(currentPage - 1);
    }
  };

  const handlePageLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) => {
    e.preventDefault();
    handleChangePage(page);
  };

  const handleNextLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isLast) {
      handleChangePage(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: isFirst })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirst ? 'true' : 'false'}
          onClick={handlePrevLinkClick}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={classNames('page-item', { active: page === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={e => handlePageLinkClick(e, page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', { disabled: isLast })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLast ? 'true' : 'false'}
          onClick={handleNextLinkClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
