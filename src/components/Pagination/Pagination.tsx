import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

enum MoveLinksDirections {
  Forward = 'forward',
  Back = 'back',
}

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const getNumbersOfPages = getNumbers(1, Math.ceil(total / perPage));

  const disabledNextLink =
    currentPage === getNumbersOfPages[getNumbersOfPages.length - 1];

  const disabledPrevLink = currentPage === getNumbersOfPages[0];

  const moveLinks = (value: number, direction: string) => {
    if (
      direction === MoveLinksDirections.Forward &&
      value > getNumbersOfPages[0]
    ) {
      onPageChange(value);
    }

    if (
      direction === MoveLinksDirections.Back &&
      value < getNumbersOfPages[getNumbersOfPages.length - 1]
    ) {
      onPageChange(value);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: disabledPrevLink,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={disabledPrevLink}
          onClick={() =>
            moveLinks(currentPage - 1, MoveLinksDirections.Forward)
          }
        >
          «
        </a>
      </li>
      {getNumbersOfPages.map(num => (
        <li
          key={num}
          className={cn('page-item', { active: currentPage === num })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: disabledNextLink,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={disabledNextLink}
          onClick={() => moveLinks(currentPage + 1, MoveLinksDirections.Back)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
