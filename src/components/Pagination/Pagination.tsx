import React from 'react';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pagesNumber = Math.ceil(total / perPage);
  const pages = Array.from({ length: pagesNumber }, (_, index) => index + 1);
  const lastPage = pages[pages.length - 1];
  const prevAllowed = currentPage > 1;
  const nextAllowed = currentPage < lastPage;

  function handlePrevClick() {
    if (prevAllowed) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNextClick() {
    if (nextAllowed) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: !prevAllowed,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={!prevAllowed}
          onClick={() => handlePrevClick()}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', {
            active: currentPage === page,
          })}
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
        className={cn('page-item', {
          disabled: !nextAllowed,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={!nextAllowed}
          onClick={() => handleNextClick()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
