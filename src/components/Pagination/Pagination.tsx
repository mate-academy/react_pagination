import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  itemsPerPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pageCount = getNumbers(1, (Math.ceil(total / itemsPerPage)));
  const isFirstPage = currentPage === pageCount[0];
  const isLastPage = currentPage === pageCount.length;

  const goToNextPage = () => {
    return !isLastPage
      ? onPageChange(currentPage + 1)
      : currentPage;
  };

  const backToPreviousPage = () => {
    return !isFirstPage
      ? onPageChange(currentPage - 1)
      : currentPage;
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          'page-item disabled': isFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => backToPreviousPage()}
        >
          «
        </a>
      </li>
      {pageCount.map(pageNumber => (
        <li
          key={pageNumber}
          className={cn('page-item', {
            active: currentPage === pageNumber,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => goToNextPage()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
