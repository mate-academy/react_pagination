import cn from 'classnames';
import { useMemo } from 'react';
import { getNumbers } from '../../utils';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const startOfItems = (currentPage - 1) * perPage;
  const endOfItems = currentPage * perPage;
  const maxNumberOfPages = Math.ceil(total / perPage);
  const isPageFirst = currentPage === 1;
  const isPageLast = currentPage === maxNumberOfPages;

  const allItems = useMemo(() => {
    return getNumbers(1, total)
      .map(n => `Item ${n}`);
  }, [total]);

  const visibleItems = allItems.slice(startOfItems, endOfItems);
  const pageItems = getNumbers(1, maxNumberOfPages);

  const handleSetPrevPage = () => {
    if (!isPageFirst) {
      onPageChange(currentPage - 1);
    }
  };

  const handleSetNextPage = () => {
    if (!isPageLast) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: isPageFirst,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isPageFirst}
            onClick={handleSetPrevPage}
          >
            «
          </a>
        </li>
        {pageItems.map(pageItem => {
          return (
            <li
              key={pageItem}
              className={cn('page-item', {
                active: pageItem === currentPage,
              })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${pageItem}`}
                onClick={() => onPageChange(pageItem)}
              >
                {pageItem}
              </a>
            </li>
          );
        })}
        <li className={cn('page-item', {
          disabled: isPageLast,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isPageLast}
            onClick={handleSetNextPage}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {visibleItems.map(item => (
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
