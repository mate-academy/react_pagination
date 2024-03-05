import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const elementPageLink: number[] = getNumbers(1, Math.ceil(total.length / perPage));
  const lastPageLink: number = elementPageLink[elementPageLink.length - 1];

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          aria-disabled={currentPage > 1 ? 'false' : 'true'}
        >
          «
        </a>
      </li>
      {elementPageLink.map(el => {
        return (
          <li
            className={cn('page-item', { active: el === currentPage })}
            key={el}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${el}`}
              onClick={() => onPageChange(el)}
            >
              {el}
            </a>
          </li>
        );
      })}
      <li
        className={cn('page-item', {
          disabled: currentPage === lastPageLink,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() =>
            currentPage < lastPageLink && onPageChange(currentPage + 1)
          }
          aria-disabled={currentPage < lastPageLink ? 'false' : 'true'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
