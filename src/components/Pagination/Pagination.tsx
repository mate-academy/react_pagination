import React from 'react';
import cn from 'classnames';

interface Props {
  pages: number[];
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  pages,
  setCurrentPage,
  currentPage,
}) => {
  const lastPage = pages[pages.length - 1];
  const canMovePrev = currentPage > 1;
  const canMoveNext = currentPage < lastPage;

  function onPrev() {
    if (canMovePrev) {
      setCurrentPage(currentPage - 1);
    }
  }

  function onNext() {
    if (canMoveNext) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: !canMovePrev,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage - 1}`}
          aria-disabled={!canMovePrev}
          onClick={() => onPrev()}
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
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: !canMoveNext,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={!canMoveNext}
          onClick={() => onNext()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
