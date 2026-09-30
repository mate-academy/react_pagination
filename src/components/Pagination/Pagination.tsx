import React from 'react';

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
  const pageCount = Math.ceil(total / perPage);
  const paginationLength: number[] = [];
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pageCount;

  for (let index = 1; index <= pageCount; index++) {
    paginationLength.push(index);
  }

  const handleClickNavigation = (page: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (page < 1 || page > pageCount || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handleClickNavigation(currentPage - 1)}
        >
          «
        </a>
      </li>

      {paginationLength.map((number: number, index: number) => (
        <li className={`page-item ${number === currentPage ? 'active' : ''}`} key={index}>
          <a data-cy="pageLink" className="page-link" href={`#${number}`} onClick={handleClickNavigation(number)}>
            {number}
          </a>
        </li>
      ))}

      <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handleClickNavigation(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
