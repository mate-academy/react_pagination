import classNames from 'classnames';
import React from 'react';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: React.Dispatch<React.SetStateAction<number>>,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: numberOfPages }, (_, index) => index + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;

  const prevLinkHandler = () => {
    if (!isFirstPage) {
      onPageChange(page => page - 1);
    }
  };

  const nextLinkHandler = () => {
    if (!isLastPage) {
      onPageChange(page => page + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item',
        { disabled: isFirstPage })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={prevLinkHandler}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={classNames('page-item',
            { active: currentPage === page })}
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

      <li className={classNames('page-item',
        { disabled: isLastPage })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={nextLinkHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
