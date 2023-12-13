import React from 'react';
import cn from 'classnames';

interface Props {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  onClickForward: () => void;
  onClickBack: () => void;
  pagesRange: number[];
  visibleItems: number[];
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  onPageChange,
  onClickForward,
  onClickBack,
  pagesRange,
  visibleItems,
}) => {
  const isLastPageActive = currentPage === pagesRange[pagesRange.length - 1];
  const isFirstPageActive = currentPage === 1;

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: isFirstPageActive })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPageActive}
            onClick={onClickBack}
          >
            «
          </a>
        </li>
        {pagesRange.map((item) => {
          return (
            <li
              className={cn('page-item', { active: currentPage === item })}
              key={item}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${item}`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </a>
            </li>
          );
        })}
        <li className={cn('page-item', { disabled: isLastPageActive })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPageActive}
            onClick={onClickForward}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map((item) => (
          <li
            data-cy="item"
            key={item}
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
