import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (pageNum: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesToDisplay
    = [...Array(Math.ceil(total / perPage))].map((_, i) => i + 1);

  const currentPageIsFirst = currentPage === 1;
  const currentPageIsLast = currentPage === pagesToDisplay.length;

  const prevButtonhandler = () => {
    if (currentPageIsFirst) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const nextButtonHandler = () => {
    if (currentPageIsLast) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          { disabled: currentPageIsFirst },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPageIsFirst}
          onClick={prevButtonhandler}
        >
          «
        </a>
      </li>

      {pagesToDisplay.map((page) => (
        <li
          className={classNames(
            'page-item',
            { active: currentPage === page },
          )}
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

      <li
        className={classNames(
          'page-item',
          { disabled: currentPageIsLast },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPageIsLast}
          onClick={nextButtonHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
