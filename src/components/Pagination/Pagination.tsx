import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total = 42,
  perPage = 5,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const handlePageChange = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  const forPrev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const forNext = () => {
    if (currentPage !== totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1
            ? 'true'
            : 'false'}
          onClick={() => forPrev()}
        >
          «
        </a>
      </li>
      {pageNumbers.map((item) => {
        const names = cn('page-item', {
          active: currentPage === item,
        });

        return (
          <li className={names} key={item}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => handlePageChange(item)}
            >
              {item}
            </a>
          </li>
        );
      })}
      <li
        className={cn('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages
            ? 'true'
            : 'false'}
          onClick={() => forNext()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
