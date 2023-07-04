import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange:(page:number) => void;
};

export const Pagination:React.FC< Props > = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const endPage = Math.ceil(total / perPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const items = getNumbers(1, endPage)
    .map(n => n);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {items.map(item => (
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
        ))}
        <li className={cn('page-item', { disabled: currentPage === endPage })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === endPage ? 'true' : 'false'}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
