import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

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
}) => {
  const pages = Array(Math.ceil(total / perPage))
    .fill(0)
    .map((_, i) => i + 1);

  const end = currentPage * perPage;

  const items = getNumbers(
    (currentPage - 1) * perPage + 1,
    end < total ? end : total,
  ).map(n => `Item ${n}`);

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: currentPage === pages[0] })}
          onClick={() => {
            if (currentPage !== pages[0]) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={event => event.preventDefault()}
            aria-disabled={currentPage === pages[0]}
          >
            «
          </a>
        </li>

        {pages.map(p => (
          <li
            key={p}
            className={cn('page-item', { active: p === currentPage })}
            onClick={event => {
              if (p !== currentPage) {
                onPageChange(p);
              }

              event.preventDefault();
            }}
          >
            <a data-cy="pageLink" className="page-link" href={`#${p}`}>
              {p}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: currentPage === pages[pages.length - 1],
          })}
          onClick={() => {
            if (currentPage !== pages[pages.length - 1]) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={event => event.preventDefault()}
            aria-disabled={currentPage === pages[pages.length - 1]}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
