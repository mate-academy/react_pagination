import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  currentPage: number,
  itemsPerPage: number,
  total: number,
  onPageChange: React.Dispatch<React.SetStateAction<number>>,
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  itemsPerPage,
  total,
  onPageChange,
}) => {
  const totalPages: number[] = getNumbers(
    1, Math.ceil(total / itemsPerPage),
  );

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  const previous = () => {
    if (currentPage !== 1) {
      onPageChange((prevState: number) => prevState - 1);
    }
  };

  const next = () => {
    if (currentPage !== totalPages.length) {
      onPageChange((prevState: number) => prevState + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={previous}
        >
          «
        </a>
      </li>
      {totalPages.map((value: number) => {
        const href = `#${value}`;

        return (
          <li
            key={value}
            className={cn(
              'page-item',
              { active: currentPage === value },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={href}
              onClick={() => handleClick(value)}
            >
              {value}
            </a>
          </li>
        );
      })}
      <li className={cn(
        'page-item',
        { disabled: currentPage === totalPages.length },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages.length}
          onClick={next}
        >
          »
        </a>
      </li>
    </ul>
  );
};
