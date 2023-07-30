import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pagesArray: number[] = getNumbers(1, pagesCount);
  const items = getNumbers(1, total)
    .map(n => `Item ${n}`);
  const currentPageItems = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const handlePageChanging = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevLinkClick = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextLinkClick = () => {
    if (currentPage !== pagesCount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => handlePrevLinkClick()}
          >
            «
          </a>
        </li>
        {pagesArray.map(page => (
          <li
            key={page}
            className={cn(
              'page-item',
              { active: page === currentPage },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handlePageChanging(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={cn(
            'page-item',
            { disabled: currentPage === pagesCount },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesCount}
            onClick={() => handleNextLinkClick()}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {currentPageItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};
