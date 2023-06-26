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

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1
            ? 'true'
            : 'false'}
          onClick={(event) => onClickPrevButton(event)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={classNames(
            'page-item', { active: currentPage === page },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            key={page}
            onClick={(event) => {
              event.preventDefault();
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', {
        disabled: currentPage === numberOfPages,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPages
            ? 'true'
            : 'false'}
          onClick={(event) => onClickNextButton(event)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
