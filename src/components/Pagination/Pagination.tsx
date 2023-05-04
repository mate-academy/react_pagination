import cn from 'classnames';
import { FC } from 'react';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChanger: (page: number) => void,
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChanger,
}) => {
  const limitOfPageCount = Math.ceil(total / perPage);
  const pageCounts = [];

  for (let i = 1; i <= limitOfPageCount; i += 1) {
    pageCounts.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCounts.length;

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item',
          { disabled: isFirstPage })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => {
              if (currentPage > 1) {
                onPageChanger(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pageCounts.map(page => (
          <li
            className={cn('page-item',
              { active: currentPage === page })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChanger(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={cn('page-item',
          { disabled: isLastPage })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => {
              if (currentPage < pageCounts.length) {
                onPageChanger(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
