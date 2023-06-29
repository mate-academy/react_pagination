import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page:number) => void,
}
export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, numberOfPages);
  const isLastPage = currentPage === numberOfPages;
  const isFirstPage = currentPage === 1;

  const onClickPrevButton = (event: React.MouseEvent) => {
    event.preventDefault();

    if (currentPage !== 1) {
      const newPage = currentPage - 1;

      onPageChange(newPage);
    }
  };

  const onClickNextButton = (event: React.MouseEvent) => {
    event.preventDefault();

    if (currentPage !== numberOfPages) {
      const newPage = currentPage + 1;

      onPageChange(newPage);
    }
  };

  const onPageClick = (event: React.MouseEvent, page: number) => {
    event.preventDefault();
    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: isFirstPage,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={onClickPrevButton}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item', { active: currentPage === page },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={(event) => onPageClick(event, page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', {
        disabled: isLastPage,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={onClickNextButton}
        >
          »
        </a>
      </li>
    </ul>
  );
};
