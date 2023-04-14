import React, { useMemo } from 'react';
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
  const pageNumbers = useMemo(() => {
    const numbers = [];

    for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
      numbers.push(i);
    }

    return numbers;
  }, [total, perPage]);

  const handlePrevClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const page = currentPage - 1;

    event.preventDefault();

    if (page > 0) {
      onPageChange(page);
    }
  };

  const handleNextClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const page = currentPage + 1;

    event.preventDefault();

    if (page <= pageNumbers.length) {
      onPageChange(page);
    }
  };

  const handleNumberClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    pageNumber: number,
  ) => {
    event.preventDefault();
    onPageChange(pageNumber);
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
              onClick={(event) => handleNumberClick(event, pageNumber)}
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
