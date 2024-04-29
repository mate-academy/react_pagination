import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const maxPage = Math.ceil(total / perPage);
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
        className={cn('page-item', { disabled: currentPage === 1 })}
        onClick={decrement}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={cn('page-item', { active: currentPage === page })}
          key={page}
          onClick={() => onPageChange(page)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', { disabled: currentPage === maxPage })}
        onClick={increment}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === maxPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
