import React from 'react';
import cn from 'classnames';

interface Props {
  currentPage: number;
  availablePages: number[];
  isFirstPage: boolean;
  isLastPage: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
  onSelectPage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  availablePages,
  isFirstPage,
  isLastPage,
  onPrevPage,
  onNextPage,
  onSelectPage,
}) => {
  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => onPrevPage()}
        >
          «
        </a>
      </li>

      {availablePages.map(item => {
        const isPageActive = currentPage === item;

        return (
          <li key={item} className={cn('page-item', { active: isPageActive })}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => {
                onSelectPage(item);
              }}
            >
              {item}
            </a>
          </li>
        );
      })}

      <li className={cn('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => onNextPage()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
