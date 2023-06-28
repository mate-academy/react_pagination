import React from 'react';
import cn from 'classnames';

type Props = {
  currentPage: number,
  pages: number[],
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = (
  {
    currentPage,
    pages,
    onPageChange,
  },
) => {
  const handleNextClick = () => {
    if (currentPage !== pages.length) {
      const nextPage = currentPage + 1;

      onPageChange(nextPage);
    }
  };

  const handlePrevClick = () => {
    if (currentPage !== 1) {
      const prevPage = currentPage - 1;

      onPageChange(prevPage);
    }
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
            aria-disabled="true"
            onClick={handlePrevClick}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={cn(
              'page-item',
              {
                active: currentPage === page,
              },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn(
            'page-item',
            {
              disabled: currentPage === pages.length,
            },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={handleNextClick}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
