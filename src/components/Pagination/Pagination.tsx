import classNames from 'classnames';
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
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item',
          { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => onPageChange(currentPage - 1)}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={classNames('page-item',
            { active: page === currentPage })}
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
      <li
        className={classNames('page-item',
          { disabled: currentPage === totalPages })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => onPageChange(currentPage + 1)}
          aria-disabled={currentPage === totalPages}
        >
          »
        </a>
      </li>
    </ul>
  );
};
