import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (param: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const visiblePagesCount = Math.ceil(total / perPage);
  const visiblePages = getNumbers(1, visiblePagesCount);

  return (
    <ul className="pagination">
      <li
        className={cn(
          'page-item',
          { disabled: currentPage === 1 },
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

      {visiblePages.map(visiblePage => (
        <li
          key={visiblePage}
          className={cn(
            'page-item',
            { active: visiblePage === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${visiblePage}`}
            onClick={() => onPageChange(visiblePage)}
          >
            {visiblePage}
          </a>
        </li>
      ))}

      <li
        className={cn(
          'page-item',
          { disabled: currentPage === visiblePagesCount },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === visiblePagesCount}
          onClick={() => {
            if (currentPage !== visiblePagesCount) {
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
