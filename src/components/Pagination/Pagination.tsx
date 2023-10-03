import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, amountOfPages);

  const firstPage = currentPage === 1;
  const lastPage = currentPage === amountOfPages;

  const prevPageHandler = () => {
    if (!firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: firstPage },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstPage}
          onClick={prevPageHandler}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={cn(
            'page-item',
            { active: page === currentPage },
          )}
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

      <li className={cn(
        'page-item',
        { disabled: lastPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastPage}
          onClick={nextPageHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
