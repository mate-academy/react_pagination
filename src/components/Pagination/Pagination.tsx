import React from 'react';
import classNames from 'classnames';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const arrayOfPages = Array.from(
    { length: Math.ceil(total / perPage) },
    (_, i) => i + 1,
  );

  const arrayOfItems = Array.from(
    { length: Math.min(perPage, total - (currentPage - 1) * perPage) },
    (_, i) => {
      return `Item ${i + 1 + (currentPage - 1) * perPage}`;
    },
  );

  const handlePageMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    direction?: string,
    page?: number,
  ) => {
    e.preventDefault();
    switch (direction) {
      case 'prev':
        if (currentPage > 1) {
          onPageChange(currentPage - 1);
        }

        break;

      case 'next':
        if (currentPage < arrayOfPages.length) {
          onPageChange(currentPage + 1);
        }

        break;

      default:
        if (page !== undefined) {
          onPageChange(page);
        }

        break;
    }
  };

  return (
    <div>
      <ul className="pagination">
        <li
          className={classNames(`page-item`, { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={e => handlePageMove(e, 'prev')}
          >
            «
          </a>
        </li>
        {arrayOfPages.map(page => (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={e => handlePageMove(e, undefined, page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={classNames(`page-item`, {
            disabled: currentPage === arrayOfPages.length,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === arrayOfPages.length}
            onClick={e => handlePageMove(e, 'next')}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {arrayOfItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
