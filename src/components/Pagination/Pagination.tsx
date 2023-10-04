import cn from 'classnames';
import { FC, useEffect } from 'react';

import { getNumbers, getList } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemChange: (el1: number[]) => void
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  onItemChange,
}) => {
  const amountPages = total % perPage === 0
    ? Math.floor(total / perPage)
    : Math.floor(total / perPage) + 1;

  function pageHendler(event: React.MouseEvent<HTMLAnchorElement>) {
    const selectPage = +event.currentTarget.innerText;

    onPageChange(selectPage);
  }

  const pages = getNumbers(1, amountPages);

  const amountOfli = getList(currentPage, total, perPage);

  const [start, end] = amountOfli;

  const items = getNumbers(start, end).map(n => `Item ${n}`);

  function getArrowLeft() {
    if (currentPage > pages[0]) {
      onPageChange(currentPage - 1);
    }
  }

  function getArrowRight() {
    if (currentPage < amountPages) {
      onPageChange(currentPage + 1);
    }
  }

  useEffect(() => {
    onItemChange(amountOfli);
  }, [currentPage, perPage]);

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={getArrowLeft}
          >
            «
          </a>
        </li>
        { pages.map(page => (
          <li
            className={cn('page-item', { active: page === currentPage })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={pageHendler}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={cn(
          'page-item', { disabled: currentPage > pages.length - 1 },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage > pages.length - 1}
            onClick={getArrowRight}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
