import React from 'react';
import cn from 'classnames';

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
  const pageLinkArr = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    pageLinkArr.push(i);
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
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
            onClick={() => {
              onPageChange(link);
            }}
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
          aria-disabled={currentPage === pageLinkArr.length ? 'true' : 'false'}
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
});
