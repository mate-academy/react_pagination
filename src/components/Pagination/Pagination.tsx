import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountOfPages = Math.ceil(total / perPage);

  const handlePrevPage = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = (): void => {
    if (currentPage < amountOfPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number): void => {
    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>

      {Array.from({ length: amountOfPages }, (_, index) => index + 1)
        .map(pageNumber => {
          return (
            <li
              className={classNames('page-item', {
                active: pageNumber === currentPage,
              })}
              key={pageNumber}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${pageNumber}`}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </a>
            </li>
          );
        })}
      <li className={classNames('page-item', {
        disabled: currentPage === amountOfPages,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === amountOfPages}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
