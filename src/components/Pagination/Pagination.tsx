import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  perPage: number;
  currentPage: number;
  totalPages: number;
  handlePage: (currentPage: number) => void;
}

const TOTAL_ITEM = 42;

export const Pagination : React.FC<Props> = (
  {
    perPage, currentPage, totalPages, handlePage,
  },

) => {
  const pagesNumber = Math.ceil(TOTAL_ITEM / perPage);
  const paginated = getNumbers(1, pagesNumber);

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handlePage(currentPage - 1)}
        >
          «
        </a>
      </li>
      {paginated.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: currentPage === page })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePage(page)}

          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn(
        'page-item',
        { disabled: currentPage === totalPages },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={() => handlePage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
