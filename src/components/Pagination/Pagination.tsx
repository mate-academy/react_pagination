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
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    const page = currentPage - 1;

    if (page > 0) {
      onPageChange(page);
    }
  };

  const handleNextClick = () => {
    const page = currentPage + 1;

    if (page <= pageNumbers.length) {
      onPageChange(page);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
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
            onClick={handlePrevClick}
          >
            «
          </a>
        </li>

        {pageNumbers.map(pageNumber => (
          <li
            className={classNames(
              'page-item',
              {
                active: currentPage === pageNumber,
              },
            )}
            key={pageNumber}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </a>
          </li>
        ))}

        <li
          className={classNames(
            'page-item',
            {
              disabled: currentPage === pageNumbers.length,
            },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage === pageNumbers.length ? 'true' : 'false'
            }
            onClick={handleNextClick}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
