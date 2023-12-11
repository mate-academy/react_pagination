import React, { ReactElement } from 'react';
import cn from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage?: number,
  onPageChange: (page: number) => void;

};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageLinks = () => {
    const pageLinks: ReactElement[] = [];

    for (let i = 1; i <= totalPages; i++) {
      const isCurrentPage = i === currentPage;

      pageLinks.push(
        <li
          className={cn(
            'page-item',
            {
              active: isCurrentPage,
            },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>,
      );
    }

    return pageLinks;
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn(
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
            aria-disabled={currentPage === 1
              ? 'true'
              : 'false'}
            onClick={() => {
              if (currentPage > 1) {
                handlePageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {renderPageLinks()}
        <li className={cn('page-item',
          {
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
            onClick={() => {
              if (currentPage < totalPages) {
                handlePageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {Array.from(
          {
            length: Math.min(
              perPage,
              total - (currentPage - 1) * perPage,
            ),
          },
          (_, index) => (currentPage - 1) * perPage + index + 1,
        ).map((itemNumber) => (
          <li
            key={itemNumber}
            data-cy="item"
          >
            {`Item ${itemNumber}`}
          </li>
        ))}
      </ul>
    </>
  );
};
