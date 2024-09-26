import classNames from 'classnames';
import { getPageNumbers } from '../../utils';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages: number[] = getPageNumbers(total, perPage);

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', { ['disabled']: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {totalPages.map((page: number) => (
        <li
          className={classNames('page-item', {
            ['active']: currentPage === page,
          })}
          key={+Math.random().toFixed(4)}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={e => {
              e.preventDefault();
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          ['disabled']: currentPage === totalPages.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages.length ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
