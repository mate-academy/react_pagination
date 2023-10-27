import React from 'react';
import cn from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage?: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const isPageFirst = currentPage === 1;
  const isPageLast = currentPage === numberOfPages;

  const getButtons = (): JSX.Element[] => {
    const array: JSX.Element[] = [];

    for (let i = 1; i <= numberOfPages; i += 1) {
      const clickHandler = () => {
        if (currentPage !== i) {
          onPageChange(i);
        }
      };

      array.push((
        (
          <li
            className={cn('page-item', { active: i === currentPage })}
            key={i}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i}`}
              onClick={clickHandler}
            >
              {i}
            </a>
          </li>
        )
      ));
    }

    return array;
  };

  const prevButtonClick = () => {
    if (currentPage && !isPageFirst) {
      onPageChange(currentPage - 1);
    }
  };

  const nextButtonClick = () => {
    if (currentPage && !isPageLast) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isPageFirst })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPageFirst}
          onClick={prevButtonClick}
        >
          «
        </a>
      </li>
      {getButtons()}
      <li className={cn('page-item', { disabled: isPageLast })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isPageLast}
          onClick={nextButtonClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};

Pagination.defaultProps = {
  currentPage: 1,
};
