import React from 'react';
import classNames from 'classnames';

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
  const numberOfPages = Math.ceil(total / perPage);

  const allPages = Array(numberOfPages)
    .fill(1)
    .map((page, index) => page + index);

  const handleClickPrevPage = () => {
    onPageChange(
      currentPage > 1
        ? currentPage - 1
        : currentPage,
    );
  };

  const handleClickNextPage = () => {
    onPageChange(
      currentPage < numberOfPages
        ? currentPage + 1
        : currentPage,
    );
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
          onClick={handleClickPrevPage}
        >
          «
        </a>
      </li>

      {allPages.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            { active: currentPage === page },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === numberOfPages },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPages}
          onClick={handleClickNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
