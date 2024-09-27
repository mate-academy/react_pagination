import cn from 'classnames';
import { getNumbers } from '../../utils';

type PropsPagination = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: PropsPagination) => {
  const items = getNumbers(1, total);
  const totalPages = Math.ceil(items.length / perPage);
  const totalPagesArr = getNumbers(1, totalPages);

  return (
    <ul className="pagination">
      <li
        className={cn(
          'page-item',
          { disabled: currentPage === 1 },
          { active: currentPage === 1 },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {totalPagesArr.map(p => (
        <li className={cn('page-item', { active: currentPage === p })} key={p}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${p}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </a>
        </li>
      ))}
      <li
        className={cn(
          'page-item',
          { disabled: currentPage === totalPages },
          { active: currentPage === totalPages },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={() => {
            if (currentPage !== totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
