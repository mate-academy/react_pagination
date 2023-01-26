import cn from 'classnames';
import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const requiredPages = Math.ceil(total / perPage);
  const pageList = Array.from({ length: requiredPages }, (_, i) => i + 1);

  const firstPage = pageList[0];
  const lastPage = pageList[pageList.length - 1];
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const handleNextButton = () => {
    if (currentPage === lastPage) {
      return;
    }

    onPageChange(nextPage);
  };

  const handlePreviousButton = () => {
    if (currentPage === firstPage) {
      return;
    }

    onPageChange(previousPage);
  };

  return (
    <ul className="pagination">
      <li
        className={cn(
          'page-item',
          { disabled: currentPage === firstPage },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === firstPage}
          onClick={handlePreviousButton}
        >
          «
        </a>
      </li>
      {pageList.map(page => (
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
          { disabled: currentPage === lastPage },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={handleNextButton}
        >
          »
        </a>
      </li>
    </ul>
  );
};
