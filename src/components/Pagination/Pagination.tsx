import React from 'react';
import cn from 'classnames';

interface PaginationInterface {
  total: number; // total number of items to paginate
  perPage: number; // number of items per page
  currentPage: number /* optional with 1 by default */;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<PaginationInterface> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);

  const pagesArray: number[] = [];
  const currentPageItems: number[] = [];
  const startItem = perPage * (currentPage - 1) + 1;
  const lastItem = pages === currentPage ? total : startItem + perPage - 1;

  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }

  for (let i = startItem; i <= lastItem; i++) {
    currentPageItems.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', currentPage === 1 && 'disabled')}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? true : false}
            onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {pagesArray.map(page => (
          <li
            className={cn('page-item', { active: currentPage === page })}
            key={page}
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

        <li className={cn('page-item', currentPage === pages && 'disabled')}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages ? true : false}
            onClick={() =>
              currentPage !== pages && onPageChange(currentPage + 1)
            }
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {currentPageItems.map(item => (
          <li data-cy="item" key={item}>
            Item {item}
          </li>
        ))}
      </ul>
    </>
  );
};
