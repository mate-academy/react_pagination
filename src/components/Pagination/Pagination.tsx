import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  itemPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  itemPerPage,
  currentPage,
  onPageChange,
}) => {
  const maxPage = Math.ceil(total / itemPerPage);
  const pages = getNumbers(1, maxPage);

  const increment = () => {
    const nextPage = currentPage + 1;

    if (nextPage <= maxPage) {
      onPageChange(nextPage);
    }
  };

  const decrement = () => {
    const prevPage = currentPage - 1;

    if (prevPage >= 1) {
      onPageChange(prevPage);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1 ? true : false,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={decrement}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={classNames('page-item', {
            active: page === currentPage,
          })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: currentPage === maxPage ? true : false,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === maxPage}
          onClick={increment}
        >
          »
        </a>
      </li>
    </ul>
  );
};
