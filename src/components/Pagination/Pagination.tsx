import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const optPages = Math.ceil(total / perPage);
  const renderPages = getNumbers(1, optPages);

  return (
    <ul className="pagination">
      <li
        className={cn({
          'page-item': true,
          disabled: currentPage === 1,
        })}
        onClick={
          currentPage !== 1 ? () => onPageChange(currentPage - 1) : () => {}
        }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? `true` : `false`}
        >
          «
        </a>
      </li>
      {renderPages.map(page => (
        <li
          className={cn({
            'page-item': true,
            active: currentPage === page,
          })}
          key={page}
          onClick={() => onPageChange(page)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn({
          'page-item': true,
          disabled: currentPage === optPages,
        })}
        onClick={
          currentPage !== optPages
            ? () => onPageChange(currentPage + 1)
            : () => {}
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === optPages ? `true` : `false`}
        >
          »
        </a>
      </li>
    </ul>
  );
};
