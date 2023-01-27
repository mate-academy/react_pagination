import cn from 'classnames';
import React, {
  Dispatch, FC, SetStateAction,
} from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: Dispatch<SetStateAction<number>>,
};

export const Pagination: FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange: setCurrentPage,
  },
) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isFirstPage = currentPage === pages[0];
  const isLastPage = currentPage === pages.length;

  const handleClickPrevNext = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (event
      .currentTarget.href.includes('#next')
    && !isLastPage) {
      setCurrentPage(
        (state) => state + 1,
      );
    }

    if (event.currentTarget.href.includes('#prev')
    && !isFirstPage) {
      setCurrentPage(
        (state) => state - 1,
      );
    }
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: isFirstPage },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handleClickPrevNext}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={cn(
            'page-item',
            { active: page === currentPage },
          )}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn(
        'page-item',
        { disabled: isLastPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handleClickPrevNext}
        >
          »
        </a>
      </li>
    </ul>

  );
};
