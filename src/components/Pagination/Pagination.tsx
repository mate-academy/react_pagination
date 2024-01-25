import React from 'react';
import cn from 'classnames';
// import { getNumbers } from '../../utils';

interface Props {
  items:string[],
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (value: number) => void;
}

export const Pagination:React.FC<Props> = ({
  items,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const firstItem = (currentPage - 1) * perPage;
  const lastItem = currentPage * perPage < items.length
    ? currentPage * perPage
    : items.length;

  const itemsArr = items.slice(firstItem, lastItem);

  function handleNextPage() {
    if (currentPage < totalPages) {
      onPageChange(Number(currentPage + 1));
    }
  }

  function handlePrevPage() {
    if (currentPage !== 1) {
      onPageChange(Number(currentPage - 1));
    }
  }

  const handlePageChangeIfDifferent = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  return (
    <>
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
            aria-disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={cn('page-item', {
              active: page === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              aria-disabled={currentPage === 1}
              onClick={() => handlePageChangeIfDifferent(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', { disabled: currentPage === totalPages })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsArr
          .map((item) => (
            <li
              key={item}
              data-cy="item"
            >
              {item}
            </li>
          ))}
      </ul>
    </>
  );
};
