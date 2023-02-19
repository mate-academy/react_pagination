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
  onPageChange = () => {},
}) => {
  const pagesToDisplay
    = [...Array(Math.ceil(total / perPage))].map((_, i) => i + 1);

  const prevButtonhandler = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const nextButtonHandler = () => {
    if (currentPage === pagesToDisplay.length) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === 1 },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
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
          { disabled: currentPage === pagesToDisplay.length },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesToDisplay.length}
          onClick={nextButtonHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
