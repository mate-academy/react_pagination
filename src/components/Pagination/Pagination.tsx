import cn from 'classnames';
import React from 'react';

type Props = {
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
  total: number;
};

export const Pagination: React.FC<Props> = props => {
  const { perPage, currentPage, onPageChange, total } = props;
  let pages = perPage;
  const allPages = Math.ceil(total / perPage);

  pages = allPages;

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleChangeCurrentPage = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const value = event.currentTarget.textContent;

    if (value !== null) {
      onPageChange(parseInt(value));
    }
  };

  return (
    <React.Fragment>
      <ul className="pagination">
        <li
          className={cn(`page-item`, {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={currentPage > 1 ? handlePrevPage : undefined}
          >
            «
          </a>
        </li>
        {Array.from({ length: pages }, (_, i) => i + 1).map(pageNumber => {
          return (
            <li
              key={pageNumber}
              className={cn(`page-item`, {
                active: currentPage === pageNumber,
              })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${pageNumber}`}
                onClick={handleChangeCurrentPage}
              >
                {pageNumber}
              </a>
            </li>
          );
        })}
        <li
          className={cn(`page-item`, {
            disabled: currentPage === pages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages}
            onClick={currentPage !== pages ? handleNextPage : undefined}
          >
            »
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
};
