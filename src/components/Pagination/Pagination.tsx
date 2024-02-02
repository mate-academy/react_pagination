import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (item: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages: number = Math.ceil(total / perPage);
  const paginationButtons: number[] = getNumbers(1, numberOfPages);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {paginationButtons.map((button) => (
          <li
            className={cn('page-item', { active: currentPage === button })}
            key={button}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${button}`}
              onClick={() => onPageChange(button)}
            >
              {button}
            </a>
          </li>
        ))}

        <li className={cn(
          'page-item',
          { disabled: currentPage === numberOfPages },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numberOfPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
