import React from 'react';
import cn from 'classnames';

type Props = {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Array.from(
    { length: Math.ceil(total.length / perPage) },
    (_, index) => index + 1,
  );

  const prevLinkAria = currentPage === 1;
  const nextLinkAria = currentPage === pageCount.length;

  const handlePrevClick = () => {
    if (!prevLinkAria) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!nextLinkAria) {
      onPageChange(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * perPage;
  const itemsForCurrentPage = total.slice(startIndex, startIndex + perPage);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={prevLinkAria}
            onClick={handlePrevClick}
          >
            «
          </a>
        </li>
        {pageCount.map((page) => (
          <li
            key={page}
            className={cn('page-item', { active: page === currentPage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item',
            { disabled: currentPage === pageCount.length })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={nextLinkAria}
            onClick={handleNextClick}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsForCurrentPage.map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
