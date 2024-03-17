import cn from 'classnames';
import { MouseEventHandler } from 'react';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

function getNumbers(numStart: number, numEnd: number): number[] {
  const arrayNumsResult = [];

  for (let i: number = numStart; i <= numEnd; i += 1) {
    arrayNumsResult.push(i);
  }

  return arrayNumsResult;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const items = getNumbers(1, total).map(n => n);
  const pageNumbersList = getNumbers(1, Math.ceil(total / perPage)).map(n => n);

  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pageNumbersList.length;

  const visibleItems = items.slice(
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage,
  );

  const clickHandler = (n: number): MouseEventHandler<HTMLAnchorElement> => {
    if (n !== currentPage && n >= 1 && n <= pageNumbersList.length) {
      return () => onPageChange(n);
    }

    return () => {};
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: isCurrentPageFirst })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isCurrentPageFirst}
            onClick={clickHandler(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pageNumbersList.map(n => (
          <li
            key={n}
            className={cn('page-item', { active: currentPage === n })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${currentPage}`}
              onClick={clickHandler(n)}
            >
              {n}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: isCurrentPageLast,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            aria-disabled={isCurrentPageLast}
            href="#next"
            onClick={clickHandler(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
