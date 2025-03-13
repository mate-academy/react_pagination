import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const pagesCount: number = Math.ceil(total / perPage);
  const buttonNumbers: number[] = getNumbers(1, pagesCount);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage <= 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {buttonNumbers.map((buttonNumber: number) => (
        <li
          key={buttonNumber}
          className={cn('page-item', { active: currentPage === buttonNumber })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${buttonNumber}`}
            onClick={() => onPageChange(buttonNumber)}
          >
            {buttonNumber}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPage === pagesCount })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount}
          onClick={() => {
            if (currentPage < pagesCount) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
