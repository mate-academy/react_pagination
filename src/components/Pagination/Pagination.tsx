import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

enum Buttons {
  LeftArrow,
  PageButton,
  RightArrow,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange = () => { },
}) => {
  const currentPagesNumber = Math.ceil(total / perPage);
  const pagesArray = getNumbers(1, currentPagesNumber);

  const isFirstPage = () => currentPage === 1;
  const isCurrentPage = (page: number) => page === currentPage;
  const isLastPage = () => currentPage === currentPagesNumber;

  function handleClick(button: Buttons, page: number = currentPage) {
    switch (button) {
      case Buttons.LeftArrow:
        return () => {
          if (!isFirstPage()) {
            onPageChange(currentPage - 1);
          }
        };

      case Buttons.PageButton:
        return () => {
          if (!isCurrentPage(page)) {
            onPageChange(page);
          }
        };

      case Buttons.RightArrow:
        return () => {
          if (currentPage !== currentPagesNumber) {
            onPageChange(currentPage + 1);
          }
        };

      default:
        return () => {};
    }
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage() })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage() ? 'true' : 'false'}
          onClick={handleClick(Buttons.LeftArrow)}
        >
          «
        </a>
      </li>

      {pagesArray.map(page => (
        <li
          className={cn('page-item', { active: isCurrentPage(page) })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={handleClick(Buttons.PageButton, page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={
        cn('page-item',
          { disabled: isLastPage() })
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage() ? 'true' : 'false'}
          onClick={handleClick(Buttons.RightArrow)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
