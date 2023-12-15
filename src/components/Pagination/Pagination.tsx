import cn from 'classnames';
import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countPages = Math.ceil(total / perPage);
  const prevPageDisabled = currentPage === 1;
  const nextPageDisabled = currentPage === countPages;

  const checkPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const checkNextPage = () => {
    if (currentPage < countPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pages = getNumbers(1, countPages)
    .map(page => {
      return (
        <li
          className={cn(
            'page-item',
            { active: page === currentPage },
          )}
          key={page}
        >
          <a
            onClick={() => {
              onPageChange(page);
            }}
            key={page}
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      );
    });

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: prevPageDisabled },
      )}
      >
        <a
          onClick={checkPrevPage}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevPageDisabled}
        >
          «
        </a>
      </li>
      {pages}
      <li className={cn(
        'page-item',
        { disabled: nextPageDisabled },
      )}
      >
        <a
          onClick={checkNextPage}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextPageDisabled}
        >
          »
        </a>
      </li>
    </ul>
  );
};
