import cn from 'classnames';
import { getNumbers } from '../../utils';

type PaginationProps = {
  itemsOnPage: string[];
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  itemsOnPage,
  total = 42,
  perPage = 5,
  currentPage = 1,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = getNumbers(1, Math.ceil(total / perPage)).map(i => i);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', currentPage === 1 ? 'disabled' : '')}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => {
              if (currentPage - 1 >= pageNumbers[0]) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pageNumbers.map((page, i) => (
          <li
            key={i}
            className={cn('page-item', page === currentPage ? 'active' : '')}
            onClick={() => onPageChange(page)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={cn(
            'page-item',
            currentPage === pageNumbers.length ? 'disabled' : '',
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage === pageNumbers.length ? 'true' : 'false'
            }
            onClick={() => {
              if (currentPage + 1 <= pageNumbers[pageNumbers.length - 1]) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsOnPage.map((item, i) => {
          const startIndex = (currentPage - 1) * perPage;
          return (
            <li key={startIndex + i} data-cy="item">
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};
