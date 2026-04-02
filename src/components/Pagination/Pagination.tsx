import type { FC, MouseEvent } from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages: number[] = [];

  if (totalPages <= 1) {
    return null;
  }

  for (let page = 1; page <= totalPages; page += 1) {
    pages.push(page);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (
    event: MouseEvent<HTMLAnchorElement>,
    page: number,
  ): void => {
    event.preventDefault();

    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage ? 'true' : 'false'}
          onClick={event => {
            if (isFirstPage) {
              event.preventDefault();

              return;
            }

            handlePageChange(event, currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={event => handlePageChange(event, page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage ? 'true' : 'false'}
          onClick={event => {
            if (isLastPage) {
              event.preventDefault();

              return;
            }

            handlePageChange(event, currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
