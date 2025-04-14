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
  const countTabs = Math.ceil(total / perPage);

  const disablePrev = currentPage === 1;
  const disableNext = currentPage === countTabs;

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: disablePrev,
        })}
      >
        <a
          data-cy="prevLink"
          className={cn('page-link')}
          href="#prev"
          aria-disabled={disablePrev}
          onClick={() => !disablePrev && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {getNumbers(1, countTabs).map(page => {
        return (
          <li
            key={page}
            className={cn('page-item', {
              'active': page === currentPage,
            })}
          >
            <a
              onClick={() => onPageChange(page)}
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li
        className={cn('page-item', {
          disabled: disableNext,
        })}
      >
        <a
          data-cy="nextLink"
          className={cn('page-link')}
          href="#next"
          aria-disabled={disableNext}
          onClick={() => !disableNext && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
