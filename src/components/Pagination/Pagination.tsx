import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number
  currentPage: number,
  onPageChange: (newPage: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageCount);
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: prevPage < 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevPage < 1}
          onClick={() => {
            if (prevPage >= 1) {
              onPageChange(prevPage);
            }
          }}
        >
          «
        </a>
      </li>

      {
        pages.map(page => (
          <li
            key={page}
            className={cn('page-item', {
              active: currentPage === page,
            })}
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
        ))
      }

      <li className={cn('page-item', {
        disabled: nextPage > pageCount,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextPage > pageCount}
          onClick={() => {
            if (nextPage <= pageCount) {
              onPageChange(nextPage);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
