import cn from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

const getPages = (totalPages: number) => {
  return [...Array(totalPages)].map((_, i) => i + 1);
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = getPages(totalPages);

  const pageItemCN = (page: number) => {
    return cn('page-item', {
      active: page === currentPage,
    });
  };

  const onPrevPageClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const onPageClick = (page: number) => {
    onPageChange(page);
  };

  const onNextPageClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => onPrevPageClick()}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li key={page} className={pageItemCN(page)}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageClick(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPage === totalPages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={() => onNextPageClick()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
