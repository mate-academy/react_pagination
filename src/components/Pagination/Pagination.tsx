import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const maxPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, maxPage);

  const handlePageSelect = (page: number) => {
    if (page !== currentPage && page > 0 && page <= maxPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={
        classNames('page-item', { disabled: currentPage === 1 })
      }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handlePageSelect(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li className={
          classNames('page-item', { active: page === currentPage })
        }
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageSelect(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={
        classNames('page-item', { disabled: currentPage === maxPage })
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === maxPage}
          onClick={() => handlePageSelect(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
