import React from 'react';
import cn from 'classnames';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (item: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfButtons = Math.ceil(total / perPage);
  const buttonsArray = Array.from({ length: numberOfButtons }, (_, i) => i + 1);
  const onPageChangeHandler = (item: number): void => onPageChange(item);
  const onArrowClickHandler = (
    page: number,
    numberToCompare: number,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void => {
    if (page === numberToCompare) {
      event.preventDefault();
    } else {
      if (numberToCompare === 1) {
        onPageChange(page - 1);
      }

      if (numberToCompare === numberOfButtons) {
        onPageChange(page + 1);
      }
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={event => onArrowClickHandler(currentPage, 1, event)}
          >
            «
          </a>
        </li>
        {buttonsArray.map(item => {
          const className = cn('page-item', { active: currentPage === item });

          return (
            <li className={className} key={item}>
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${item}`}
                onClick={() => onPageChangeHandler(item)}
              >
                {item}
              </a>
            </li>
          );
        })}
        <li
          className={cn('page-item', {
            disabled: currentPage === numberOfButtons,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numberOfButtons}
            onClick={event =>
              onArrowClickHandler(currentPage, numberOfButtons, event)
            }
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
