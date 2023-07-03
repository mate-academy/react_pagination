import React from 'react';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination:React.FC<Props> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const pages = Array.from({
    length: Math.ceil(total / perPage),
  }, (_, i) => i + 1);

  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < pages.length ? currentPage + 1 : pages.length;

  const handlePrevClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onPageChange(prevPage);
  };

  const handleNextClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onPageChange(nextPage);
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: !prevPage || prevPage === currentPage },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={!prevPage || prevPage === currentPage}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>
      {
        pages.map((page) => (
          <li
            key={page}
            className={cn(
              'page-item', { active: page === currentPage },
            )}
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
        ))

      }
      <li className={cn(
        'page-item',
        { disabled: !nextPage || nextPage === currentPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={!nextPage || nextPage === currentPage}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
