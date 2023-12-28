import React from 'react';
import cn from 'classnames';

type Props = {
  pages: number[];
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  pages,
  currentPage,
  setCurrentPage,
}) => {
  const moveBack = currentPage > 1;
  const lastPage = pages[pages.length - 1];
  const moveForward = currentPage < lastPage;

  function onBack() {
    if (moveBack) {
      setCurrentPage(currentPage - 1);
    }
  }

  function onForward() {
    if (moveForward) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: !moveBack,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage - 1}`}
          aria-disabled={!moveBack}
          onClick={onBack}
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

      <li className={cn('page-item', {
        disabled: !moveForward,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage + 1}`}
          aria-disabled={!moveForward}
          onClick={onForward}
        >
          »
        </a>
      </li>
    </ul>
  );
};
