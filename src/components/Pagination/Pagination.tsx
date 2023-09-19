import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = React.memo(({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageLinkArr = getNumbers(1, Math.ceil(total / perPage));

  return (
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
      {pageLinkArr.map(link => (
        <li
          key={link}
          className={cn('page-item', { active: link === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${link}`}
            onClick={() => onPageChange(link)}
          >
            {link}
          </a>
        </li>
      ))}
      <li className={cn(
        'page-item', { disabled: currentPage === pageLinkArr.length },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageLinkArr.length}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
});
