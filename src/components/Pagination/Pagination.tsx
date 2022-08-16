import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, lastPage);
  const isCurrntFirst = currentPage === 1;
  const isCurrentLast = currentPage === lastPage;

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: isCurrntFirst },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${pages[currentPage - 1]}`}
          aria-disabled={isCurrntFirst}
          onClick={() => {
            if (!isCurrntFirst) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            { active: page === currentPage },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${page}`}
            aria-disabled={isCurrntFirst}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item',
        { disabled: isCurrentLast },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${pages[currentPage + 1]}`}
          aria-disabled={isCurrentLast}
          onClick={() => {
            if (!isCurrentLast) {
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
